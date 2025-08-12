import os
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS

def get_store(subject,year,sem):
    
    base_dir = os.path.dirname(os.path.dirname(__file__))  # model/
    # project_root = os.path.dirname(base_dir)  # Bot-1.2/
    persist_path = os.path.join("model", "Vector_Store", f"{subject}_{year}_{sem}")
    print(persist_path)
    embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
    vectorstore = FAISS.load_local(
        persist_path,
        embeddings,
        allow_dangerous_deserialization=True
    )
    return vectorstore

# base_dir = os.path.dirname(os.path.dirname(__file__))  # model/
# project_root = os.path.dirname(base_dir)  # Bot-1.2/

