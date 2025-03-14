from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import os
import json
import sys
import asyncio  # ✅ Added for potential async crawling

# Import scraper functions
from scrapper import (
    crawl_urls as crawl,
    scrape_urls_from_file as scrape,
    process_and_store as store,
    view_stored_data as view,
    query_and_respond as query,
)

# Initialize FastAPI app
app = FastAPI()

# Enable CORS (Restrict allowed origins for security)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # ✅ Allow all origins
    allow_credentials=True,
    allow_methods=["*"],  # ✅ Allow all HTTP methods
    allow_headers=["*"],  # ✅ Allow all headers
)

# Request models
class CrawlRequest(BaseModel):
    url: str
    maxPages: int = 100

class QueryRequest(BaseModel):
    query: str

# Define paths
BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATA_DIR = os.path.join(BASE_DIR, "data")

# Ensure the data directory exists
os.makedirs(DATA_DIR, exist_ok=True)

@app.post("/crawl")
def handle_crawl(request: CrawlRequest):
    try:
        if not request.url:
            raise HTTPException(status_code=400, detail="URL is required")

        # ✅ Convert maxPages to int and validate
        try:
            max_pages = int(request.maxPages)
            if max_pages <= 0:
                raise ValueError
        except ValueError:
            raise HTTPException(status_code=400, detail="maxPages must be a positive integer")

        print(f"🔄 Crawling started from: {request.url} with maxPages={max_pages}", file=sys.stderr)

        # ✅ Step 1: Run Crawler
        links = crawl(request.url, max_pages)

        if not links:
            raise HTTPException(status_code=500, detail="No links found during crawling")

        # ✅ Step 2: Store links in JSON file
        links_file_path = os.path.join(DATA_DIR, "links.json")
        with open(links_file_path, "w", encoding="utf-8") as file:
            json.dump(links, file, indent=2)

        print(f"✅ Links stored at: {links_file_path}", file=sys.stderr)

        # ✅ Step 3: Run Scraper on Stored Links
        scraped_data = scrape(links_file_path)

        if not scraped_data:
            raise HTTPException(status_code=500, detail="Scraping failed. No data extracted.")

        # ✅ Step 4: Store Scraped Data
        scraped_data_file_path = os.path.join(DATA_DIR, "scraped_data.json")
        with open(scraped_data_file_path, "w", encoding="utf-8") as file:
            json.dump(scraped_data, file, indent=2)

        print(f"✅ Scraped data stored at: {scraped_data_file_path}", file=sys.stderr)

        # ✅ Step 5: Read the stored data before passing to store()
        with open(scraped_data_file_path, "r", encoding="utf-8") as file:
            scraped_data = json.load(file)  # ✅ Now we have a List[Dict]

        # ✅ Step 6: Process Data with ChromaDB
        store(scraped_data)

        print(f"✅ Scraped data stored at: {scraped_data_file_path}", file=sys.stderr)

        # ✅ Step 7: View Stored Data
        # result = view()

        # print(f"📌 Final Stored Data: {result}", file=sys.stderr)

        return JSONResponse(content={"success": True, "links": links})

    except HTTPException as http_err:
        return JSONResponse(content={"error": http_err.detail}, status_code=http_err.status_code)

    except Exception as e:
        print(f"❌ Error in /crawl: {e}", file=sys.stderr)
        return JSONResponse(content={"error": str(e)}, status_code=500)
     
@app.post("/query")
async def handle_query(request: QueryRequest):
    try:
        result = await asyncio.to_thread(query, request.query)
        return JSONResponse(content={"response": result})
    except Exception as e:
        print(f"❌ Error in /query: {e}", file=sys.stderr)
        return JSONResponse(content={"error": str(e)}, status_code=500) 
