def extract_page_contents(inputs):
    # docs is usually a list of Document objects
    query = inputs["query"]
    docs = inputs["retriever"].invoke(query)
    page_contents = [doc.page_content for doc in docs]
    return {"context": page_contents,"query": query}