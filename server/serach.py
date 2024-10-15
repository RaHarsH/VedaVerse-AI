import pymongo
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from sentence_transformers import SentenceTransformer
from transformers import AutoTokenizer, AutoModelForCausalLM

class AISearchEngine:
    def __init__(self, mongodb_uri, db_name, collection_name):
        # MongoDB Atlas connection
        self.client = MongoClient(mongodb_uri, server_api=ServerApi('1'))
        self.db = self.client[db_name]
        self.collection = self.db[collection_name]

        # Initialize Nomic embeddings model
        self.embeddings_model = SentenceTransformer('nomic-ai/nomic-embed-text-v1')

        # Initialize open-source LLM (e.g., GPT-2)
        self.tokenizer = AutoTokenizer.from_pretrained("gpt2")
        self.model = AutoModelForCausalLM.from_pretrained("gpt2")

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
        input_ids = self.tokenizer.encode(prompt, return_tensors="pt")
        output = self.model.generate(input_ids, max_length=100, num_return_sequences=1, no_repeat_ngram_size=2)
        return self.tokenizer.decode(output[0], skip_special_tokens=True)

    def search(self, query):
        search_results = self.semantic_search(query)
        context = "\n".join([result['text'] for result in search_results])
        response = self.generate_response(query, context)
        return response