from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient
from datetime import datetime
import uvicorn  # <--- Import Uvicorn

app = FastAPI()

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Connect to MongoDB
client = MongoClient("mongodb://localhost:27017/")
db = client["mycitydb"]
reports_collection = db["reports"]

@app.post("/api/reports")
async def create_report(request: Request):
    try:
        data = await request.json()
        data["createdAt"] = datetime.utcnow()

        reports_collection.insert_one(data)

        return {"message": "Report saved successfully"}
    except Exception as e:
        print("Error:", e)
        return {"error": "Failed to save report"}

if __name__ == "__main__":
    # This block tells Uvicorn to run the app.
    # The 'mycityserver:app' string means: 
    #   - 'mycityserver': the Python module (your filename).
    #   - 'app': the FastAPI object inside the module.
    uvicorn.run("mycityserver:app", host="127.0.0.1", port=8000, reload=True)