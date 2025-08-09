import os
from fastapi.middleware.cors import CORSMiddleware

from pathlib import Path
from dotenv import load_dotenv
env_path = Path(__file__).parent / ".env"
load_dotenv(dotenv_path=env_path) 

from fastapi import FastAPI
from pydantic import BaseModel
from model.AImodel import build_chain  # Import the builder, not the chain itself


origins = [
    "http://localhost:3000",  # React dev server
    "https://academic-q-a-bot.vercel.app/"  # Add production frontend URL here
]

app = FastAPI(title="LangChain API", version="1.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class QueryRequest(BaseModel):
    question: str

@app.post("/ask")
async def ask_question(request: QueryRequest):
    chain = build_chain()  # ✅ Build chain on demand (fresh key + retriever)
    answer = chain.invoke(request.question)
    return {"question": request.question, "answer": answer}
