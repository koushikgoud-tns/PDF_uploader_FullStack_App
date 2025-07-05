from llama_index.core import SimpleDirectoryReader, VectorStoreIndex, Settings
from llama_index.embeddings.huggingface import HuggingFaceEmbedding
from llama_index.llms.groq import Groq
from dotenv import load_dotenv
import os
load_dotenv() 

groq_api_key=os.environ["GROQ_API_KEY"] 


def answer_question(filename: str, question: str) -> str:
    text_path = f"data/{filename}.txt"

    reader = SimpleDirectoryReader(input_files=[text_path])
    docs = reader.load_data()

    # Local embeddings (still free)
    Settings.embed_model = HuggingFaceEmbedding(model_name="sentence-transformers/all-MiniLM-L6-v2")

    # ✅ Use Groq LLM (e.g., Mixtral or Llama3)
    Settings.llm = Groq(model="llama3-70b-8192")  # or "llama3-70b-8192", "gemma-7b-it"

    # Build index
    index = VectorStoreIndex.from_documents(docs)
    query_engine = index.as_query_engine()
    response = query_engine.query(question)

    return str(response)


