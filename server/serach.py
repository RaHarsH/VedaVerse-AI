import pymongo
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from sentence_transformers import SentenceTransformer
import requests
import json

class AISearchEngine:
    def __init__(self, mongodb_uri, db_name, collection_name, ollama_model="llama2"):
        # MongoDB Atlas connection
        self.client = MongoClient(mongodb_uri, server_api=ServerApi('1'))
        self.db = self.client[db_name]
        self.collection = self.db[collection_name]

        # Initialize Nomic embeddings model
        self.embeddings_model = SentenceTransformer('nomic-ai/nomic-embed-text-v1')

        # Ollama model configuration
        self.ollama_model = ollama_model
        self.ollama_api_url = "http://localhost:11434/api/generate"

    def embed_query(self, query):
        return self.embeddings_model.encode([query])[0]

    def semantic_search(self, query, n=5):
        query_embedding = self.embed_query(query)
        results = self.collection.aggregate([
            {
                "$search": {
                    "index": "default",
                    "knnBeta": {
                        "vector": query_embedding.tolist(),
                        "path": "embedding",
                        "k": n
                    }
                }
            }
        ])
        return list(results)

    def generate_response(self, query, context):
        prompt = f"Query: {query}\nContext: {context}\nAnswer:"
        
        payload = {
            "model": self.ollama_model,
            "prompt": prompt,
            "stream": False
        }
        
        response = requests.post(self.ollama_api_url, json=payload)
        
        if response.status_code == 200:
            result = response.json()
            return result['response']
        else:
            raise Exception(f"Error from Ollama API: {response.text}")

    def search(self, query):
        search_results = self.semantic_search(query)
        context = "\n".join([result['text'] for result in search_results])
        response = self.generate_response(query, context)
        return response