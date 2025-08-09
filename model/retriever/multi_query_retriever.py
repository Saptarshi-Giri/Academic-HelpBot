import os
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.retrievers.multi_query import MultiQueryRetriever
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS
from ..utils.get_vector_store import get_store

load_dotenv()
key=os.getenv("GEMINI_API_KEY_2")

llm = ChatGoogleGenerativeAI(model="gemini-2.5-flash",temperature=0.1,google_api_key=key)

def multi_query(subject,year,sem):
    vector_store=get_store(subject,year,sem)
    mq_retriever=MultiQueryRetriever.from_llm(
        retriever=vector_store.as_retriever(search_kwargs={"k":3}),
        llm=llm
    )

    return mq_retriever

mq=multi_query("Analog_CMOS",3,1)
res=mq.invoke("How we can use CMOS as an amplifier?")
print(res)

    

