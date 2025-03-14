from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import subprocess
import json
import os
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

app = FastAPI()

# Enable CORS to allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (Change this for security)
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (POST, GET, OPTIONS, etc.)
    allow_headers=["*"],  # Allow all headers
)

class CrawlRequest(BaseModel):
    url: str
    maxPages: int = 100

class QueryRequest(BaseModel):
    query: str

# Define paths
BASE_DIR = os.path.dirname(os.path.abspath(__file__))  # Get current script's directory
SCRIPT_PATH = os.path.abspath(os.path.join(os.path.dirname(__file__), "scrapper.py"))
DATA_DIR = os.path.join(BASE_DIR, "data")  # Ensure data folder is inside chatbot_backend 

# Ensure the data directory exists
os.makedirs(DATA_DIR, exist_ok=True)

# Function to run the scrapper.py script
def run_python_script(command: str, args: list):
    try:
        if not os.path.exists(SCRIPT_PATH):
            raise HTTPException(status_code=500, detail=f"Script not found at {SCRIPT_PATH}")

        # Try using virtual environment's Python first, fallback to system Python
        python_executable = os.path.join(BASE_DIR, "venv", "bin", "python")
        if not os.path.exists(python_executable):
            python_executable = "python"

        print(f"Executing Python script: {SCRIPT_PATH} with command: {command} and args: {args}")

        process = subprocess.Popen(
            [python_executable, SCRIPT_PATH, command, *args],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True
        )

        stdout, stderr = process.communicate()

        # Print stdout and stderr for debugging
        print(f"stdout: {stdout}")
        print(f"stderr: {stderr}")

        if process.returncode != 0:
            raise HTTPException(status_code=500, detail=f"Python process error: {stderr.strip()}")

        if stdout is None:
            raise HTTPException(status_code=500, detail="No output from script")

        try:
            return json.loads(stdout.strip())  
        except json.JSONDecodeError:
            raise HTTPException(status_code=500, detail=f"Error parsing JSON output: {stdout}")

    except Exception as e:
        print(f"Unexpected error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.options("/crawl")  # Handle OPTIONS request for /crawl
async def options_crawl():
    response = JSONResponse(content={})
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Methods"] = "POST, OPTIONS"
    response.headers["Access-Control-Allow-Headers"] = "*"
    return response

@app.post("/crawl")
async def crawl(request: CrawlRequest):
    try:
        links = run_python_script("crawl", [request.url, str(request.maxPages)])
        links_file_path = os.path.join(DATA_DIR, "links.json")
        with open(links_file_path, "w", encoding="utf-8") as file:
            json.dump(links, file, indent=2)
        scraped_data = run_python_script("scrape", [links_file_path])
        scraped_data_file_path = os.path.join(DATA_DIR, "scraped_data.json")
        with open(scraped_data_file_path, "w", encoding="utf-8") as file:
            json.dump(scraped_data, file, indent=2)
        processing_result = run_python_script("store", [scraped_data_file_path])
        result = run_python_script("view", [])
        response = JSONResponse(content={"success": True, "stored": processing_result})
    except HTTPException as e:
        response = JSONResponse(content={"error": e.detail})
    except Exception as e:
        response = JSONResponse(content={"error": str(e)})

    # Add CORS headers manually
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Methods"] = "POST, OPTIONS"
    response.headers["Access-Control-Allow-Headers"] = "*"
    return response

@app.options("/query")  # Handle OPTIONS request for /query
async def options_query():
    response = JSONResponse(content={})
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Methods"] = "POST, OPTIONS"
    response.headers["Access-Control-Allow-Headers"] = "*"
    return response

@app.post("/query")
async def query(request: QueryRequest):
    try:
        result = run_python_script("query", [request.query])
        response = JSONResponse(content={"response": result})
    except HTTPException as e:
        response = JSONResponse(content={"error": e.detail})
    response.headers["Access-Control-Allow-Origin"] = "*"
    return response