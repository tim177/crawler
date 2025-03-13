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

# Function to run the scrapper.py script
def run_python_script(command, args):
    script_path = os.path.join(os.path.dirname(__file__), "scrapper.py")
    process = subprocess.Popen(
        ["python", script_path, command] + args,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True
    )
    stdout, stderr = process.communicate()
    
    if process.returncode == 0:
        try:
            return json.loads(stdout)
        except json.JSONDecodeError:
            raise HTTPException(status_code=500, detail="Invalid JSON output from script")
    else:
        raise HTTPException(status_code=500, detail=stderr)

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
        result = run_python_script("crawl", [request.url, str(request.maxPages)])
        response = JSONResponse(content={"success": True, "data": result})
    except HTTPException as e:
        response = JSONResponse(content={"error": e.detail})
    response.headers["Access-Control-Allow-Origin"] = "*"
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