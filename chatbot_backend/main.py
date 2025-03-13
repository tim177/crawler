from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import subprocess
import json
import os

app = FastAPI()

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

@app.post("/crawl")
def crawl(request: CrawlRequest):
    try:
        result = run_python_script("crawl", [request.url, str(request.maxPages)])
        return {"success": True, "data": result}
    except HTTPException as e:
        return {"error": e.detail}

@app.post("/query")
def query(request: QueryRequest):
    try:
        result = run_python_script("query", [request.query])
        return {"response": result}
    except HTTPException as e:
        return {"error": e.detail}
