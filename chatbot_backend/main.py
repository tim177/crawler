from fastapi import FastAPI, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import os
import json
import sys
import asyncio
import time

# Import scraper functions
from scrapper import crawl_urls as crawl, scrape_urls_from_file as scrape, process_and_store as store, query_and_respond as query

# Initialize FastAPI app
app = FastAPI()

# ✅ Properly configured CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

# Request models
class CrawlRequest(BaseModel):
    url: str
    maxPages: int = 100

class QueryRequest(BaseModel):
    query: str

# Define paths
DATA_DIR = os.path.join(os.path.dirname(__file__), "data")
os.makedirs(DATA_DIR, exist_ok=True)


@app.post("/crawl")
def handle_crawl(request: CrawlRequest):
    try:
        if not request.url:
            raise HTTPException(status_code=400, detail="URL is required")

        max_pages = request.maxPages
        if max_pages <= 0:
            raise HTTPException(status_code=400, detail="maxPages must be a positive integer")

        print(f"🔄 Crawling started: {request.url}, maxPages={max_pages}", file=sys.stderr)

        # ✅ Get links only (NO scraping here)
        links = crawl(request.url, max_pages)
        if not links:
            raise HTTPException(status_code=500, detail="No links found.")

        print(f"✅ Links fetched: {len(links)} links", file=sys.stderr)

        # ✅ Return links immediately
        return {"success": True, "links": links}

    except Exception as e:
        print(f"❌ Error in /crawl: {e}", file=sys.stderr)
        return {"error": str(e)}


@app.post("/store")
def store_links(request: dict):
    try:
        links = request.get("links", [])
        if not links:
            raise HTTPException(status_code=400, detail="No links provided")

        print(f"✅ Storing {len(links)} links...", file=sys.stderr)

        # ✅ Scrape the links
        scraped_data = scrape(links)
        if not scraped_data:
            raise HTTPException(status_code=500, detail="Scraping failed")

        print("✅ data scrapped successfully now storing in chromadb")

        # ✅ Store in ChromaDB
        # store(scraped_data)
        print("✅ Data stored in ChromaDB", file=sys.stderr)

        return {"success": True, "message": "Data stored successfully"}

    except Exception as e:
        print(f"❌ Error in /store: {e}", file=sys.stderr)
        return {"error": str(e)}


@app.post("/query")
async def handle_query(request: QueryRequest):
    try:
        result = await asyncio.to_thread(query, request.query)
        return {"response": result}
    except Exception as e:
        print(f"❌ Error in /query: {e}", file=sys.stderr)
        return JSONResponse(content={"error": str(e)}, status_code=500)
