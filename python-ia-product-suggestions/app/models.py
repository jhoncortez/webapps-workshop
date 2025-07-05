import os
from typing import List, Dict, Any
# from pymongo import MongoClient
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from app.database import client
from app.utils import clean_html
import joblib


import spacy

nlp = spacy.load("en_core_web_sm")

def extract_entities(text: str) -> set:
    doc = nlp(text)
    entities = set(ent.text.lower() for ent in doc.ents)
    # Optionally add nouns/adjectives for broader matching
    entities.update(token.lemma_.lower() for token in doc if token.pos_ in {"NOUN", "ADJ"} and not token.is_stop)
    return entities

class ConversationContext:
    def __init__(self):
        self.entities = set()
        self.history = []

    def update(self, prompt: str):
        doc = nlp(prompt)
        # Extract named entities
        for ent in doc.ents:
            self.entities.add(ent.text.lower())
        # Also extract key nouns and adjectives
        for token in doc:
            if token.pos_ in {"NOUN", "ADJ"} and not token.is_stop:
                self.entities.add(token.lemma_.lower())
        self.history.append(prompt)

    def get_entities(self):
        # if self.history:
        #     last_prompt = self.history[-1]
        #     last_prompt_entities = extract_entities(last_prompt)
        #     self.entities = self.entities | last_prompt_entities
        return self.entities

class ProductRecommenderTV:
    def __init__(self, db_name: str, collection_name: str, model_path: str = "tfidf_model.joblib"):
        # self.mongo_uri = mongo_uri
        self.db_name = db_name
        self.collection_name = collection_name
        self.model_path = model_path
        self.vectorizer = None
        self.products = []
        self.product_texts = []
        self.product_ids = []
        self.context = ConversationContext()

    def load_products(self):
        # client = MongoClient(self.mongo_uri)
        db = client[self.db_name]
        collection = db[self.collection_name]
        self.products = [{"_id": str(product["_id"]), 
                          "description": product.get("description", ""),
                        #   **{k: v for k, v in product.items() if k not in ["_id", "description"]}
                          } for product in collection.find()]
        # Clean descriptions for better matching
        self.product_texts = [clean_html(p.get("description", "")) for p in self.products]
        self.product_ids = [p["_id"] for p in self.products]
        client.close()

    def train(self):
        self.load_products()
        self.vectorizer = TfidfVectorizer(stop_words='english')
        self.vectorizer.fit(self.product_texts)
        joblib.dump(self.vectorizer, self.model_path)

    def load_model(self):
        if os.path.exists(self.model_path):
            self.vectorizer = joblib.load(self.model_path)
        else:
            self.train()

    def filter_products_by_entities(self, prompt_entities: set) -> list:
        indices = []
        for i, text in enumerate(self.product_texts):
            product_entities = extract_entities(text)
            if prompt_entities & product_entities:  # intersection is not empty
                indices.append(i)
        return indices

    def recommend(self, prompt: str, top_n: int = 5) -> List[Dict[str, Any]]:
        self.context.update(prompt)
        if not self.vectorizer:
            self.load_model()
        if not self.products:
            self.load_products()
        prompt_vec = self.vectorizer.transform([prompt])
        product_vecs = self.vectorizer.transform(self.product_texts)
        similarities = cosine_similarity(prompt_vec, product_vecs).flatten()

        # Use entities from the current prompt only
        prompt_entities = extract_entities(prompt)
        filtered_indices = self.filter_products_by_entities(prompt_entities)
        if filtered_indices:
            similarities_filtered = similarities[filtered_indices]
            top_indices = [filtered_indices[i] for i in similarities_filtered.argsort()[::-1][:top_n]]
        else:
            # No relevant products found
            return []

        recommendations = [{"_id": self.products[i]["_id"], "description": self.products[i]["description"]} for i in top_indices]
        return recommendations
    

from sentence_transformers import SentenceTransformer
import numpy as np

class ProductRecommenderST:
    def __init__(self, db_name: str, collection_name: str, model_path: str = "sbert_model"):
        self.db_name = db_name
        self.collection_name = collection_name
        self.model_path = model_path
        self.model = SentenceTransformer('all-MiniLM-L6-v2')
        self.products = []
        self.product_texts = []
        self.product_ids = []
        self.embeddings = None

    def load_products(self):
        db = client[self.db_name]
        collection = db[self.collection_name]
        self.products = [{"_id": str(product["_id"]), 
                          "description": product.get("description", ""),
                        #   **{k: v for k, v in product.items() if k not in ["_id", "description"]}
                          } for product in collection.find()] # list(collection.find())
        self.product_texts = [p.get("description", "") for p in self.products]
        self.product_ids = [str(p.get("_id")) for p in self.products]
        client.close()

    def train(self):
        self.load_products()
        self.embeddings = self.model.encode(self.product_texts, convert_to_numpy=True)
        np.save(self.model_path, self.embeddings)

    def load_model(self):
        if os.path.exists(self.model_path + ".npy"):
            self.embeddings = np.load(self.model_path + ".npy")
        else:
            self.train()

    def recommend(self, prompt: str, top_n: int = 5):
        if self.embeddings is None:
            self.load_model()
        if not self.products:
            self.load_products()
        prompt_vec = self.model.encode([prompt], convert_to_numpy=True)
        # similarities = np.dot(self.embeddings, prompt_vec.T).flatten()
        similarities = cosine_similarity(prompt_vec, self.embeddings).flatten()
        top_indices = similarities.argsort()[::-1][:top_n]
        # recommendations = [self.products[i] for i in top_indices]
        # return recommendations
        recommendations = [{"_id": self.products[i]["_id"], "description": self.products[i]["description"]} for i in top_indices]
        return recommendations