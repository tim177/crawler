from fastapi import FastAPI, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import os
import json
import sys
import asyncio

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
def handle_crawl(request: CrawlRequest, background_tasks: BackgroundTasks):
    try:
        if not request.url:
            raise HTTPException(status_code=400, detail="URL is required")

        max_pages = request.maxPages
        if max_pages <= 0:
            raise HTTPException(status_code=400, detail="maxPages must be a positive integer")

        print(f"🔄 Crawling started: {request.url}, maxPages={max_pages}", file=sys.stderr)

        # ✅ Get links immediately
        links = crawl(request.url, max_pages)
        if not links:
            raise HTTPException(status_code=500, detail="No links found.")

        # ✅ Store links
        links_file = os.path.join(DATA_DIR, "links.json")
        with open(links_file, "w", encoding="utf-8") as file:
            json.dump(links, file, indent=2)

        print(f"✅ Links stored: {links_file}", file=sys.stderr)

        # ✅ Run scraping & storing in the background
        background_tasks.add_task(process_links, links_file)

        return {"success": True, "links": links}

    except Exception as e:
        print(f"❌ Error in /crawl: {e}", file=sys.stderr)
        return JSONResponse(content={"error": str(e)}, status_code=500)

def process_links(links_file):
    try:
        # ✅ Scrape stored links
        scraped_data = scrape(links_file)
        if not scraped_data:
            print("❌ Scraping failed.", file=sys.stderr)
            return

        # ✅ Store scraped data
        scraped_file = os.path.join(DATA_DIR, "scraped_data.json")
        with open(scraped_file, "w", encoding="utf-8") as file:
            json.dump(scraped_data, file, indent=2)

        print(f"✅ Scraped data stored: {scraped_file}", file=sys.stderr)

        # ✅ Store in ChromaDB
        store(scraped_data)
        print("✅ Data stored in ChromaDB", file=sys.stderr)

    except Exception as e:
        print(f"❌ Error in process_links: {e}", file=sys.stderr)

@app.post("/query")
async def handle_query(request: QueryRequest):
    try:
        result = await asyncio.to_thread(query, request.query)
        return {"response": result}
    except Exception as e:
        print(f"❌ Error in /query: {e}", file=sys.stderr)
        return JSONResponse(content={"error": str(e)}, status_code=500)
