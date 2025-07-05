from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import pdf, qa
import os

app = FastAPI()

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # change this in production!
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create folders if they don’t exist
os.makedirs("uploads", exist_ok=True)
os.makedirs("data", exist_ok=True)

# Include routers
app.include_router(pdf.router)
app.include_router(qa.router)

@app.get("/")
def root():
    return {"message": "PDF Q&A backend is running"}
