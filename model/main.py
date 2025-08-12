import os
import logging
from fastapi.middleware.cors import CORSMiddleware
from fastapi import HTTPException
from pathlib import Path
from langchain_openai import ChatOpenAI
from dotenv import load_dotenv
env_path = Path(__file__).parent / ".env"
load_dotenv(dotenv_path=env_path) 

from fastapi import FastAPI
from pydantic import BaseModel
from model.AImodel import build_chain  # Import the builder, not the chain itself
from model.retriever.ccm_retriever import ccm_retri
from model.misc.extract_data import extract_page_contents
from model.AImodel import get_answer

origins = [
    "http://localhost:3000",  # React dev server
    "https://academic-q-a-bot.vercel.app/"  # Add production frontend URL here
]

llm = ChatOpenAI(
    model="gpt-4o-mini",
    temperature=0.5,
    max_tokens=600,
    )

app = FastAPI(title="LangChain API", version="1.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class QueryRequest(BaseModel):
    question: str

class QueryRequest1(BaseModel):
    subject: str
    year: str
    sem: str
    question: str    

@app.get("/")
async def health_check():
    return {"status": "running"}

@app.post("/ask")
async def ask_question(request: QueryRequest):
    try:
        print("Started .........")
        chain = build_chain()
        answer = chain.invoke(request.question)
        return {"question": request.question, "answer": answer}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    

@app.post("/test")
async def ask_question(request: QueryRequest):
    key = os.getenv("OPENAI_API_KEY")
    print(key)
    return {"question": request.question}


@app.post("/test1")
async def ask_question(request: QueryRequest):
    print("Started")
    answer=llm.invoke(request.question)
    return {"question": request.question,"answer": answer}


@app.post("/test2")
async def ask_question(request: QueryRequest):
    print("Running test2........")
    ccm_ret=ccm_retri("Analog_CMOS", 3, 1)
    print(ccm_retri)
    response=ccm_ret.invoke(request.question)
    return {"question": request.question,"answer": response}

@app.post("/test3")
async def ask_question(request: QueryRequest):
    print("Running test3........")
    ccm_ret=ccm_retri("Analog_CMOS", 3, 1)
    inputs={"query":request.question , "retriever":ccm_ret}
    response=extract_page_contents(inputs)
    return {"question": request.question,"answer": response}

@app.post("/test4")
async def ask_question1(request: QueryRequest1):
    print("Running test4........")
    response=get_answer(request.subject,request.year,request.sem,request.question)
    return {"question": request.question,"answer": response}
