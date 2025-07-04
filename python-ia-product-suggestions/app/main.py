from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from app.schemas import PromptRequest
# from app.database import client

from app.models import ProductRecommenderTV, ProductRecommenderST

# from app.api.api_v1.api import api_router
# from app.core.config import settings

app = FastAPI(
    title="Product Recommendation API"
)

app.add_middleware(
    CORSMiddleware,
    # allow_origins=[str(origin) for origin in settings.BACKEND_CORS_ORIGINS],
    allow_origins=["*"],
    # allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# db= client["node-restmvcapp-mongoose"]
# db_collection = db["products"]

# Initialize the product recommendation model
# product_recommender = ProductRecommenderTV(db_name="node-restmvcapp-mongoose", collection_name='products')
# semantic approach
product_recommender = ProductRecommenderST(db_name="node-restmvcapp-mongoose", collection_name='products')

# app.include_router(api_router, prefix=settings.API_V1_STR)

@app.post("/train" )
async def train():
    product_recommender.train()
    return {"message": "Training completed"}

@app.post("/recommend")
async def recommend(prompt_request: PromptRequest):
    print(prompt_request.prompt)
    print(prompt_request.top_n)
    # # Call the product recommendation function with the prompt
    recommendations = product_recommender.recommend(prompt_request.prompt, prompt_request.top_n)
    print(f"Recommendations: {recommendations}")
    return {"recommendations": [dict(rec) for rec in recommendations]}


@app.get("/")
async def root():
    return {"message": "Hello World"}