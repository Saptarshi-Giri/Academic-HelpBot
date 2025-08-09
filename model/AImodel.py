import os
from dotenv import load_dotenv
from model.misc.extract_data import extract_page_contents
from model.prompt.prompt_input import User_Prompt
from langchain_google_genai import ChatGoogleGenerativeAI
from model.retriever.ccm_retriever import ccm_retriever
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnableLambda



load_dotenv()  
key=os.getenv("GEMINI_API_KEY_1")
model = ChatGoogleGenerativeAI(model="gemini-2.5-pro",temperature=0.1,google_api_key=key,max_tokens=20000) 
CCM_Retriever=ccm_retriever("Analog_CMOS",3,1)

chain = (
    RunnableLambda(lambda q: {"query": q, "retriever": CCM_Retriever})
    | RunnableLambda(extract_page_contents)
    | User_Prompt
    | model
    | StrOutputParser()
)

query = "How we can use CMOS as an amplifier?"
result = chain.invoke(query)
print(result)







                    



 
    

