from fastapi import FastAPI, HTTPException
from models.resume_builder import ResumeBuilder
from services.firebase import db

app = FastAPI()

@app.get("/generate-resume/{user_id}")
def generate_resume(user_id: str):
    doc_data = db.collection("resumes").document(user_id).get()
    if not doc_data.exists:
        raise HTTPException(status_code=404, detail="User data not found")

    resume_data = doc_data.to_dict()
    builder = ResumeBuilder(resume_data)
    pdf_path = builder.generate_pdf(filename=f"{user_id}_resume")

    return {"pdf_path": pdf_path}
