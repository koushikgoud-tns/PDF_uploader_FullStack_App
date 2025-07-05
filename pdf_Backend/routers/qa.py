from fastapi import APIRouter, HTTPException, Body
from pydantic import BaseModel
from utils.qa_engine import answer_question

router = APIRouter()

class QARequest(BaseModel):
    filename: str
    question: str

@router.post("/ask")
def ask_question(data: QARequest):
    try:
        answer = answer_question(data.filename, data.question)
        return {"answer": answer}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
