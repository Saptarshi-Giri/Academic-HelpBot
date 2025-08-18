# ETCE AI TUTOR

## University Electronics AI Chatbot (RAG-powered)

**ETCE AI TUTOR** is a full-stack **Retrieval-Augmented Generation (RAG)** chatbot designed for electronics and communication engineering students. It helps learners query concepts directly from curated textbooks and receive accurate, context-driven answers powered by **OpenAI LLMs** and FAISS-based retrieval.

---

## ✨ What is RAG?

**Retrieval-Augmented Generation (RAG)** enhances large language models by combining information retrieval with generative AI:

* **Retrieve** – Relevant text chunks are fetched from a knowledge base (e.g., textbooks) using vector similarity search.
* **Augment** – These chunks are combined with the student’s question.
* **Generate** – The LLM produces an answer **grounded in source content**.

### Why RAG vs Plain LLM?

| Feature                           | Plain LLM | RAG + LLM |
| --------------------------------- | --------- | --------- |
| Domain-specific knowledge         | ❌         | ✅         |
| Reliable, reference-based answers | ❌         | ✅         |
| Efficient use of context window   | ❌         | ✅         |
| Reduced hallucination             | ❌         | ✅         |

# Architecture

<img width="800" height="418" alt="https___dev-to-uploads s3 amazonaws com_uploads_articles_5t6w4exp24wz8tga26ul" src="https://github.com/user-attachments/assets/f95e8476-4826-4b3c-ad64-bc82b24c33c6" />

---

## 🔍 Use Case

* Assists students in understanding **microprocessors, electronics, and communication concepts**.
* Provides universities with a **syllabus-aligned digital tutor** for academic support.

---

## 🚀 Tech Stack

### Backend

* **FastAPI** – Chat API and user management
* **MongoDB** – User data and chat history
* **FAISS** – Vector search for textbook chunks
* **HuggingFace Transformers** – Embeddings (`all-MiniLM-L6-v2`)
* **OpenAI GPT-4 / GPT-3.5** – Final answer generation

### Frontend

* **Next.js** – Interactive UI
* **TailwindCSS** – Modern styling
* **Axios** – API communication

---

## 🔐 Features

* ✅ Conversational chat interface with AI-driven answers
* ✅ Academic context: choose **year, semester, subject** before chatting
* ✅ Chat export (PDF/JSON) for study material

---

## 💡 Workflow

1. Student logs in and selects **year, semester, subject**.
2. Enters a natural language question.
3. Query is optimized and searched in FAISS.
4. Top-ranked chunks are passed to the LLM.
5. Answer is generated with references.
6. Images retrieved by document name & page.
7. Chat history is saved for analytics.

---

## 🚫 Disclaimer

ETCE AI TUTOR is an academic demo, not intended for **medical, legal, or production-critical use**.

---

## 🌟 Credits

* OpenAI – LLMs
* HuggingFace – Embeddings
* LangChain – Vector & memory tools
