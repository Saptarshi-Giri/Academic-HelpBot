import os
from fastapi import HTTPException
from langchain_community.vectorstores import FAISS

def get_store(subject: str, year: str, sem: str,embed_llm):
    persist_path = os.path.join("model", "Vector_Store", f"{subject}_{year}_{sem}")
    abs_path = os.path.abspath(persist_path)

    # Check folder
    if not os.path.isdir(persist_path):
        raise HTTPException(
            status_code=400,
            detail=f"Vector store directory not found: {persist_path}"
        )

    # Check essential FAISS files (adjust filenames if yours differ)
    required_files = ["index.faiss", "index.pkl"]
    for file in required_files:
        file_path = os.path.join(persist_path, file)
        if not os.path.isfile(file_path):
            raise HTTPException(
                status_code=400,
                detail=f"Missing required vector store file: {file_path}"
            )

    # Load embeddings & FAISS store
    try:
        embeddings = embed_llm
        vectorstore = FAISS.load_local(
            persist_path,
            embeddings,
            allow_dangerous_deserialization=True
        )
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error loading FAISS vector store: {str(e)}"
        )

    return vectorstore
