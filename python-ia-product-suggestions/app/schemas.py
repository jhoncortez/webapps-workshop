from pydantic import BaseModel

class PromptRequest(BaseModel):
    prompt: str
    top_n: int
    model: str = "TFIDF"