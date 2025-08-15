import os
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.retrievers.contextual_compression import ContextualCompressionRetriever
from langchain.retrievers.document_compressors import LLMChainExtractor
from model.utils.get_vector_store import get_store
import logging

def ccm_retri(subject,year,sem,llm,embed_llm):
    load_dotenv()
    key=os.getenv("GEMINI_API_KEY_2")
    print(key)
    compressor=LLMChainExtractor.from_llm(llm)
    vector_store=get_store(subject,year,sem,embed_llm)
    base_retriever=vector_store.as_retriever(search_kwargs={"k":5})
    ccm_retriever=ContextualCompressionRetriever(
        base_retriever=base_retriever,
        base_compressor=compressor
    )
    print(f"CCM retriever created with key {key}")

    return ccm_retriever

# ccm=ccm_query("Analog_CMOS",3,1)
# res=ccm.invoke("How we can use CMOS as an amplifier?")
# print(res)

    

