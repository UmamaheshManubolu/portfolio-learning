# Same chat logic as portfolio_chat.py
# But now served as HTTP endpoints that any frontend can call

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv() # Load environment variables from .env file
client = OpenAI()

app = FastAPI(title="Umamahesh Portfolio API")

# CORS - allows React (localhost:5173) to talk to this server
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"], # React dev server
    allow_methods=["*"],
    allow_headers=["*"],
)

# ======================================================
# Define request/response shapes using Pydantic
# FastAPI uses these to auto-validate incoming data
# ======================================================

class ContactRequest(BaseModel):
    name: str
    email: str
    subject: str
    message: str

class ContactResponse(BaseModel):
    success: bool
    message: str

# ======================================================
# ROUTES — each one is a URL your React app can call
# ======================================================

# Route 1 — Health check
@app.get("/")
def root():
    return {
        "status": "running",
        "message": "Umamahesh Portfolio API is live"
    }

# Route 2 — About Me data
# React About Me section calls: GET http://localhost:8000/api/about
@app.get("/api/about")
def get_about():
    return {
        "name": "Umamahesh Manubolu",
        "title": "AI Research Engineer",
        "location": "Germany",
        "email": "umamahesh.manubolu8@gmail.com",
        "linkedin": "https://www.linkedin.com/in/umamahesh-manubolu/",
        "bio": "Research-focused AI Engineer with 3+ years in Machine Learning, Computer Vision, Cognitive Robotics, and Intelligent Perception in Technical Systems. Strong foundation in applied mathematics with advanced Python and C++ programming skills.",
        "available": True
    }

# Route 3 — Experience data
# React Experience section calls: GET http://localhost:8000/api/experience
@app.get("/api/experience")
def get_experience():
    return [
        {
            "id": 1,
            "role": "AI Research Engineer",
            "company": "Your Company",
            "location": "Germany",
            "period": "2022 – Present",
            "highlights": [
                "Designed transformer architectures for multimodal robotic perception",
                "Built real-time computer vision pipelines with LiDAR and camera fusion",
                "Optimized models for edge deployment using ONNX and TensorRT"
            ],
            "tech": ["PyTorch", "Python", "C++", "ROS2", "CUDA"]
        },
        {
            "id": 2,
            "role": "Machine Learning Engineer",
            "company": "Previous Company",
            "location": "Germany",
            "period": "2020 – 2022",
            "highlights": [
                "Built deep learning models for image classification and detection",
                "Implemented data pipelines for large-scale dataset preprocessing",
                "Developed C++ modules for real-time sensor data processing"
            ],
            "tech": ["TensorFlow", "Python", "C++", "OpenCV", "ROS"]
        }
    ]

# Route 4 — Contact form
# React contact form calls: POST http://localhost:8000/api/contact
@app.post("/api/contact", response_model=ContactResponse)
async def contact(body: ContactRequest):
    print("\n New contact form submission!")
    print(f"   From:    {body.name} <{body.email}>")
    print(f"   Subject: {body.subject}")
    print(f"   Message: {body.message}")
    print("-" * 40)

    return ContactResponse(
        success=True,
        message="Message received! Umamahesh will get back to you soon."
    )
