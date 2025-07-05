from fastapi import APIRouter, UploadFile, File, HTTPException
import shutil
from utils.extract_text import extract_text_from_pdf

router = APIRouter()

@router.post("/upload")
async def upload_pdf(file: UploadFile = File(...)):
    if not file.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are supported.")
    
    file_path = f"uploads/{file.filename}"
    
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Extract text
    extract_text_from_pdf(file.filename)

    return {"message": "File uploaded and processed", "filename": file.filename}
