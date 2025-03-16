from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, Response
from pydantic import BaseModel
import os
import json
import sys
import asyncio
import scrapper
import importlib

# Import scraper functions
from scrapper import crawl_urls as crawl, scrape_urls_from_file as scrape, process_and_store as store, query_and_respond as query

# ✅ Initialize FastAPI app
app = FastAPI()

# ✅ Properly Configured CORS (No More Errors)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
    expose_headers=["*"],  # Expose all headers
)

# ✅ Handle Preflight CORS Requests
@app.options("/{full_path:path}")
async def preflight_handler(full_path: str):
    return Response(status_code=200, headers={
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE, PUT",
        "Access-Control-Allow-Headers": "*",
    })

# ✅ Request Models
class CrawlRequest(BaseModel):
    url: str
    maxPages: int = 10

class QueryRequest(BaseModel):
    query: str

# ✅ Data Directory Setup
DATA_DIR = os.path.join(os.path.dirname(__file__), "data")
os.makedirs(DATA_DIR, exist_ok=True)
SCRAPED_DATA_FILE = os.path.join(DATA_DIR, "scraped_data.json")

# ✅ Crawl API (Returns Links)
@app.post("/crawl")
def handle_crawl(request: CrawlRequest):
    try:
        # ✅ Reload scrapper.py before every request
        importlib.reload(scrapper)

        if not request.url:
            raise HTTPException(status_code=400, detail="URL is required")

        max_pages = request.maxPages
        if max_pages <= 0:
            raise HTTPException(status_code=400, detail="maxPages must be a positive integer")

        print(f"🔄 Crawling started: {request.url}, maxPages={max_pages}", file=sys.stderr)

        links = crawl(request.url, max_pages)
        if not links:
            raise HTTPException(status_code=500, detail="No links found.")

        print(f"✅ Links fetched: {len(links)} links", file=sys.stderr)

        os.makedirs(DATA_DIR, exist_ok=True)  # Create the directory if it does not exist

        # ✅ Store Links in `data/links.json`
        links_file_path = os.path.join(DATA_DIR, "links.json")
        with open(links_file_path, "w", encoding="utf-8") as f:
            json.dump(links, f, indent=2)

        print(f"✅ Links stored in {links_file_path}", file=sys.stderr)

        # ✅ Return Response With CORS Headers
        return JSONResponse(
            content={"success": True, "links": links},
            headers={"Access-Control-Allow-Origin": "*"}
        )

    except Exception as e:
        print(f"❌ Error in /crawl: {e}", file=sys.stderr)
        return JSONResponse(content={"error": str(e)}, status_code=500, headers={"Access-Control-Allow-Origin": "*"})

@app.post("/scrape")
def scrape_links(request: dict):
    try:
        links = request.get("links", [])
        if not links:
            print("❌ No links provided", file=sys.stderr)
            raise HTTPException(status_code=400, detail="No links provided")

        print(f"✅ Scraping {len(links)} links...", file=sys.stderr)

        # ✅ Scrape the links
        scraped_data = scrape(links)
        if not scraped_data:
            print("❌ Scraping failed", file=sys.stderr)
            raise HTTPException(status_code=500, detail="Scraping failed")

        print("✅ Data scraped successfully", file=sys.stderr)

         # ✅ Ensure the data directory exists
        os.makedirs(DATA_DIR, exist_ok=True)

        # ✅ Store scraped data in a JSON file
        with open(SCRAPED_DATA_FILE, "w", encoding="utf-8") as f:
            json.dump(scraped_data, f, indent=2, ensure_ascii=False)

        print(f"✅ Scraped data saved to {SCRAPED_DATA_FILE}", file=sys.stderr)

        # ✅ Return scraped data
        return JSONResponse(
            content={"success": True, "scraped_data": scraped_data},
            headers={"Access-Control-Allow-Origin": "*"}
        )

    except Exception as e:
        print(f"❌ Error in /scrape: {e}", file=sys.stderr)
        return JSONResponse(
            content={"error": str(e)}, 
            status_code=500, 
            headers={"Access-Control-Allow-Origin": "*"}
        )

@app.post("/store")
def store_links(request: dict):
    try:
        scraped_data = request.get("scraped_data", [])
        if not scraped_data:
            print("❌ No scraped data provided", file=sys.stderr)
            raise HTTPException(status_code=400, detail="No scraped data provided")

        print("✅ Storing data in ChromaDB...", file=sys.stderr)

        # ✅ Store in ChromaDB
        store(scraped_data)

        print("✅ Data stored in ChromaDB", file=sys.stderr)

        return JSONResponse(
            content={"success": True, "message": "Data stored successfully"},
            headers={"Access-Control-Allow-Origin": "*"}
        )

    except Exception as e:
        print(f"❌ Error in /store: {e}", file=sys.stderr)
        return JSONResponse(
            content={"error": str(e)}, 
            status_code=500, 
            headers={"Access-Control-Allow-Origin": "*"}
        )

# ✅ Query API (Fetches Data)
@app.post("/query")
async def handle_query(request: QueryRequest):
    try:
        result = await asyncio.to_thread(query, request.query)
        return JSONResponse(
            content={"response": result},
            headers={"Access-Control-Allow-Origin": "*"}
        )
    except Exception as e:
        print(f"❌ Error in /query: {e}", file=sys.stderr)
        return JSONResponse(content={"error": str(e)}, status_code=500, headers={"Access-Control-Allow-Origin": "*"})

