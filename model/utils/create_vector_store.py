from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS

def build_vectorstore(chunks, persist_path=None):
    embeddings =HuggingFaceEmbeddings(model_name="sentence-transformers/paraphrase-MiniLM-L3-v2")
    vectorstore = FAISS.from_documents(chunks, embeddings)
    if persist_path:
        vectorstore.save_local(persist_path)
        print(f"✅ Vector store saved at: {persist_path}")

    return vectorstore