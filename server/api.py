from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from serach import AISearchEngine

app = FastAPI()

# Initialize the AI Search Engine
search_engine = AISearchEngine(
    mongodb_uri="your_mongodb_atlas_uri_here",
    db_name="your_database_name",
    collection_name="your_collection_name"
)

class SearchQuery(BaseModel):
    query: str

@app.post("/search")
async def search(query: SearchQuery):
    try:
        result = search_engine.search(query.query)
        return {"query": query.query, "response": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/")
async def root():
    return {"message": "Welcome to the AI-powered search engine API"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)