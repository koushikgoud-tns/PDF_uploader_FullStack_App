from llama_index.core import SimpleDirectoryReader, VectorStoreIndex, ServiceContext
from llama_index.embeddings.huggingface import HuggingFaceEmbedding
from llama_index.llms.mock import MockLLM  # or keep using default one

def answer_question(filename: str, question: str) -> str:
    text_path = f"data/{filename}.txt"
    
    reader = SimpleDirectoryReader(input_files=[text_path])
    docs = reader.load_data()

    # ✅ Use local HuggingFace embeddings
    embed_model = HuggingFaceEmbedding(model_name="sentence-transformers/all-MiniLM-L6-v2")

    service_context = ServiceContext.from_defaults(embed_model=embed_model)

    # Now build index using local embeddings
    index = VectorStoreIndex.from_documents(docs, service_context=service_context)

    query_engine = index.as_query_engine()
    response = query_engine.query(question)
    
    return str(response)
