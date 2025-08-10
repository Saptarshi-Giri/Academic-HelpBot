import logging
def extract_page_contents(inputs):
    # docs is usually a list of Document objects
    query = inputs["query"]
    docs = inputs["retriever"].invoke(query)
    page_contents = [doc.page_content for doc in docs]
    print(f"Extracted page contents for query {query} and page contents are{page_contents}")
    return {"context": page_contents,"query": query}