import fitz  # PyMuPDF

def extract_text_from_pdf(filename: str):
    path = f"uploads/{filename}"
    doc = fitz.open(path)
    text = ""
    
    for page in doc:
        text += page.get_text()
    
    doc.close()
    
    with open(f"data/{filename}.txt", "w", encoding="utf-8") as f:
        f.write(text)
