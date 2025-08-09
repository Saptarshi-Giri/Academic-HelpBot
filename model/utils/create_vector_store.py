from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS

def build_vectorstore(chunks, persist_path=None):
    embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
    vectorstore = FAISS.from_documents(chunks, embeddings)

    if persist_path:
        vectorstore.save_local(persist_path)
        print(f"✅ Vector store saved at: {persist_path}")

    return vectorstore