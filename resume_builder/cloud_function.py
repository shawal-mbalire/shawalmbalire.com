"""
Google Cloud Functions entry point for Resume Builder API
"""
import functions_framework
from fastapi import FastAPI, HTTPException, Depends, Form, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, JSONResponse
from fastapi.security import HTTPBearer
from pydantic import BaseModel
from typing import List, Optional
import firebase_admin
from firebase_admin import credentials, firestore, auth
import google.generativeai as genai
import os
import tempfile
import json
from datetime import datetime
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize Firebase Admin SDK
try:
    # For Cloud Functions, use default credentials
    firebase_admin.initialize_app()
except ValueError:
    # App already initialized
    pass

db = firestore.client()

# Configure Gemini AI
genai.configure(api_key=os.getenv('GEMINI_API_KEY'))
model = genai.GenerativeModel('gemini-2.0-flash-exp')

app = FastAPI(title="Resume Builder API", version="1.0.0")

# Add CORS middleware for Cloud Functions
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure this properly for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Security
security = HTTPBearer()

# Pydantic models
class UserProfile(BaseModel):
    name: str
    title: str
    email: str
    phone: Optional[str] = None
    location: Optional[str] = None
    linkedin: Optional[str] = None
    website: Optional[str] = None
    summary: Optional[str] = None

class Experience(BaseModel):
    company: str
    title: str
    start_date: str
    end_date: Optional[str] = None
    description: str

class Education(BaseModel):
    institution: str
    degree: str
    graduation_date: str
    gpa: Optional[str] = None

class Skill(BaseModel):
    name: str
    category: str

# Helper functions
def verify_token(token: str = Depends(security)):
    try:
        decoded_token = auth.verify_id_token(token.credentials)
        return decoded_token
    except Exception as e:
        logger.error(f"Token verification failed: {e}")
        raise HTTPException(status_code=401, detail="Invalid token")

def get_user_id_from_email(email: str):
    try:
        user = auth.get_user_by_email(email)
        return user.uid
    except Exception as e:
        logger.error(f"Failed to get user ID: {e}")
        return None

@app.post("/api/login")
async def login(email: str = Form(...), password: str = Form(...)):
    try:
        # For Cloud Functions, you might want to implement custom authentication
        # or use Firebase Auth directly
        user_id = get_user_id_from_email(email)
        if user_id:
            return {"user_id": user_id, "email": email}
        else:
            raise HTTPException(status_code=401, detail="Invalid credentials")
    except Exception as e:
        logger.error(f"Login failed: {e}")
        raise HTTPException(status_code=401, detail="Login failed")

@app.get("/api/resume-preview/{user_id}")
async def get_resume_preview(user_id: str):
    try:
        user_doc = db.collection('users').document(user_id).get()
        if not user_doc.exists:
            raise HTTPException(status_code=404, detail="User not found")
        
        user_data = user_doc.to_dict()
        
        # Get experiences
        experiences = []
        exp_docs = db.collection('users').document(user_id).collection('experiences').stream()
        for doc in exp_docs:
            experiences.append(doc.to_dict())
        
        # Get education
        education = []
        edu_docs = db.collection('users').document(user_id).collection('education').stream()
        for doc in edu_docs:
            education.append(doc.to_dict())
        
        # Get skills
        skills = []
        skill_docs = db.collection('users').document(user_id).collection('skills').stream()
        for doc in skill_docs:
            skills.append(doc.to_dict())
        
        return {
            "user": user_data,
            "experiences": experiences,
            "education": education,
            "skills": skills
        }
    except Exception as e:
        logger.error(f"Failed to get resume preview: {e}")
        raise HTTPException(status_code=500, detail="Failed to get resume data")

@app.post("/api/profile/{user_id}")
async def update_profile(user_id: str, profile: UserProfile):
    try:
        db.collection('users').document(user_id).set(profile.dict(), merge=True)
        return {"message": "Profile updated successfully"}
    except Exception as e:
        logger.error(f"Failed to update profile: {e}")
        raise HTTPException(status_code=500, detail="Failed to update profile")

@app.post("/api/experience/{user_id}")
async def add_experience(
    user_id: str,
    company: str = Form(...),
    title: str = Form(...),
    start_date: str = Form(...),
    end_date: str = Form(None),
    description: str = Form(...)
):
    try:
        experience_data = {
            "company": company,
            "title": title,
            "start_date": start_date,
            "end_date": end_date,
            "description": description,
            "created_at": datetime.now().isoformat()
        }
        
        db.collection('users').document(user_id).collection('experiences').add(experience_data)
        return {"message": "Experience added successfully"}
    except Exception as e:
        logger.error(f"Failed to add experience: {e}")
        raise HTTPException(status_code=500, detail="Failed to add experience")

@app.get("/api/ai-questions/{user_id}")
async def get_ai_questions(user_id: str):
    try:
        # Get user data for context
        user_doc = db.collection('users').document(user_id).get()
        if not user_doc.exists:
            raise HTTPException(status_code=404, detail="User not found")
        
        user_data = user_doc.to_dict()
        
        # Generate AI questions based on user profile
        prompt = f"""
        Based on this professional profile, generate 5 specific questions to help improve their resume:
        
        Name: {user_data.get('name', 'N/A')}
        Title: {user_data.get('title', 'N/A')}
        Summary: {user_data.get('summary', 'N/A')}
        
        Generate questions that will help:
        1. Expand on their achievements and impact
        2. Add specific metrics and quantifiable results
        3. Improve their professional summary
        4. Identify missing skills or experiences
        5. Optimize their resume for their target roles
        
        Return only the questions, one per line.
        """
        
        response = model.generate_content(prompt)
        questions = response.text.strip().split('\n')
        
        return {"questions": questions}
    except Exception as e:
        logger.error(f"Failed to get AI questions: {e}")
        raise HTTPException(status_code=500, detail="Failed to get AI questions")

@app.post("/api/generate-resume/{user_id}")
async def generate_resume(user_id: str, type: str = "long"):
    try:
        # Get all user data
        user_doc = db.collection('users').document(user_id).get()
        if not user_doc.exists:
            raise HTTPException(status_code=404, detail="User not found")
        
        user_data = user_doc.to_dict()
        
        # Get experiences
        experiences = []
        exp_docs = db.collection('users').document(user_id).collection('experiences').stream()
        for doc in exp_docs:
            experiences.append(doc.to_dict())
        
        # Get education
        education = []
        edu_docs = db.collection('users').document(user_id).collection('education').stream()
        for doc in edu_docs:
            education.append(doc.to_dict())
        
        # Get skills
        skills = []
        skill_docs = db.collection('users').document(user_id).collection('skills').stream()
        for doc in skill_docs:
            skills.append(doc.to_dict())
        
        # Generate LaTeX content
        latex_content = generate_latex_resume(user_data, experiences, education, skills, type)
        
        # For Cloud Functions, return the LaTeX content
        # PDF generation would need to be handled by a separate service
        return JSONResponse(content={"latex": latex_content})
        
    except Exception as e:
        logger.error(f"Failed to generate resume: {e}")
        raise HTTPException(status_code=500, detail="Failed to generate resume")

def generate_latex_resume(user_data, experiences, education, skills, resume_type):
    """Generate LaTeX content for resume"""
    
    latex = f"""
\\documentclass[11pt,a4paper]{{article}}
\\usepackage[utf8]{{inputenc}}
\\usepackage[T1]{{fontenc}}
\\usepackage{{geometry}}
\\usepackage{{enumitem}}
\\usepackage{{hyperref}}
\\usepackage{{color}}
\\usepackage{{array}}

\\geometry{{margin=1in}}

\\hypersetup{{
    colorlinks=true,
    linkcolor=black,
    urlcolor=blue
}}

\\begin{{document}}

\\begin{{center}}
{{\\Large \\textbf{{{user_data.get('name', 'Name')}}}}} \\\\
{{\\large {user_data.get('title', 'Title')}}} \\\\
{user_data.get('email', 'Email')} $|$ {user_data.get('phone', 'Phone')} $|$ {user_data.get('location', 'Location')} \\\\
\\href{{{user_data.get('linkedin', '#')}}}{{LinkedIn}} $|$ \\href{{{user_data.get('website', '#')}}}{{Website}}
\\end{{center}}

\\section*{{Professional Summary}}
{user_data.get('summary', 'Professional summary goes here.')}

\\section*{{Professional Experience}}
"""
    
    for exp in experiences:
        latex += f"""
\\textbf{{{exp.get('title', 'Title')}}} at \\textbf{{{exp.get('company', 'Company')}}} \\hfill {exp.get('start_date', 'Start')} - {exp.get('end_date', 'Present')} \\\\
{exp.get('description', 'Description')} \\\\
"""
    
    if education:
        latex += "\\section*{Education}\n"
        for edu in education:
            latex += f"""
\\textbf{{{edu.get('degree', 'Degree')}}} \\hfill {edu.get('graduation_date', 'Date')} \\\\
{edu.get('institution', 'Institution')} \\\\
"""
    
    if skills:
        latex += "\\section*{Skills}\n"
        for skill in skills:
            latex += f"\\textbf{{{skill.get('category', 'Category')}}}: {skill.get('name', 'Skill')} \\\\\n"
    
    latex += "\\end{document}"
    
    return latex

# Health check endpoint for Cloud Functions
@app.get("/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.now().isoformat()}

# Root endpoint
@app.get("/")
async def root():
    return {"message": "Resume Builder API", "version": "1.0.0"}

# Cloud Functions entry point
@functions_framework.http
def resume_builder(request):
    """HTTP Cloud Function entry point"""
    import asyncio
    from fastapi.middleware.wsgi import WSGIMiddleware
    from fastapi.testclient import TestClient
    
    # Create a test client for the FastAPI app
    client = TestClient(app)
    
    # Get the request data
    method = request.method
    url = request.path
    headers = dict(request.headers)
    body = request.get_data()
    
    # Create the appropriate request
    if method == "GET":
        response = client.get(url, headers=headers)
    elif method == "POST":
        response = client.post(url, headers=headers, data=body)
    elif method == "PUT":
        response = client.put(url, headers=headers, data=body)
    elif method == "DELETE":
        response = client.delete(url, headers=headers)
    else:
        return ("Method not allowed", 405)
    
    # Return the response
    return (response.content, response.status_code, response.headers.items()) 