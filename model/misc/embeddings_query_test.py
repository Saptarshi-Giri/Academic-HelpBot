from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS

persist_path = "../Vector_Store/Analog_CMOS_3_1"

# Load embeddings and vector store
embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
vectorstore = FAISS.load_local(
    persist_path,
    embeddings,
    allow_dangerous_deserialization=True
)

# Create retriever
retriever = vectorstore.as_retriever(search_kwargs={"k": 5})

# Retrieve documents for a query
query = "What is the condition for saturation region of Diode connected CMOS?"
docs = retriever.invoke(query)

print("\n🔍 Top relevant documents:\n")
for i, doc in enumerate(docs, start=1):
    print(f"--- Result {i} ---")
    print(doc.page_content[:500], "...")
    # print("Metadata:", doc.metadata)
