from fastapi import FastAPI
import subprocess

app = FastAPI()

@app.get("/")
def home():
    return {"message": "Scraper API is running"}

@app.get("/scrape")
def run_scraper():
    try:
        # Run the scraper script
        result = subprocess.run(["python", "scrapper.py"], capture_output=True, text=True)
        
        # Return the scraper output
        return {"status": "success", "output": result.stdout}
    except Exception as e:
        return {"status": "error", "message": str(e)}

