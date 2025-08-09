import os
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.retrievers.contextual_compression import ContextualCompressionRetriever
from langchain.retrievers.document_compressors import LLMChainExtractor
from ..utils.get_vector_store import get_store

def ccm_retriever(subject,year,sem):

    key=os.getenv("GEMINI_API_KEY_2")
    llm = ChatGoogleGenerativeAI(model="gemini-2.5-flash",temperature=0.1,google_api_key=key)
    
    compressor=LLMChainExtractor.from_llm(llm)
    vector_store=get_store(subject,year,sem)
    base_retriever=vector_store.as_retriever(search_kwargs={"k":5})

    ccm_retriever=ContextualCompressionRetriever(
        base_retriever=base_retriever,
        base_compressor=compressor
    )

    return ccm_retriever

# ccm=ccm_query("Analog_CMOS",3,1)
# res=ccm.invoke("How we can use CMOS as an amplifier?")
# print(res)

    

