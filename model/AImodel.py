import os
from model.misc.extract_data import extract_page_contents
from model.prompt.prompt_input import User_Prompt
from langchain_google_genai import ChatGoogleGenerativeAI
from model.retriever.ccm_retriever import ccm_retriever
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnableLambda

def build_chain():
    """Build and return the full LangChain pipeline."""
    key = os.getenv("GEMINI_API_KEY_2")
    if not key:
        raise ValueError(
            "❌ GEMINI_API_KEY_2 not found. Please set it in your .env file."
        )

    llm = ChatGoogleGenerativeAI(
        model="gemini-2.5-flash",
        temperature=0.1,
        google_api_key=key
    )

    CCM_Retriever = ccm_retriever("Analog_CMOS", 3, 1)

    return (
        RunnableLambda(lambda q: {"query": q, "retriever": CCM_Retriever})
        | RunnableLambda(extract_page_contents)
        | User_Prompt
        | llm
        | StrOutputParser()
    )
