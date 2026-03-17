# Same chat logic as portfolio_chat.py
# But now served as HTTP endpoints that any frontend can call

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
from openai import OpenAI

import aiosmtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os

load_dotenv() # Load environment variables from .env file
client = OpenAI()

app = FastAPI(title="Umamahesh Portfolio API")

# ======================================================
# Email sending function
# ======================================================

async def send_email(name: str, email: str, subject: str, message: str):
    """Send email notification for contact form submissions"""
    # TODO: Implement email sending logic using OpenAI or email service
    # For now, just log it
    pass

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


# ── Email helper ──────────────────────────────────────────
async def send_email(name: str, email: str, subject: str, message: str):
    username = os.getenv("EMAIL_USERNAME", "")
    password = os.getenv("EMAIL_PASSWORD", "")
    to_email = os.getenv("EMAIL_TO", username)

    if not username or not password:
        print("Email not configured — skipping")
        return

    msg = MIMEMultipart("alternative")
    msg["Subject"] = f"[Portfolio] {subject}"
    msg["From"]    = username
    msg["To"]      = to_email
    msg["Reply-To"] = email

    html = f"""
    <div style="font-family:Arial,sans-serif;max-width:600px;
                padding:32px;background:#f9f9f9;border-radius:12px">
      <h2 style="color:#4f8ef7;margin-top:0">
        New Portfolio Message
      </h2>
      <table style="width:100%;border-collapse:collapse">
        <tr>
          <td style="padding:8px 0;color:#666;width:80px">Name:</td>
          <td style="padding:8px 0;font-weight:bold">{name}</td>
        </tr>
        <tr>
          <td style="padding:8px 0;color:#666">Email:</td>
          <td style="padding:8px 0">
            <a href="mailto:{email}" style="color:#4f8ef7">{email}</a>
          </td>
        </tr>
        <tr>
          <td style="padding:8px 0;color:#666">Subject:</td>
          <td style="padding:8px 0">{subject}</td>
        </tr>
      </table>
      <div style="margin-top:20px;padding:20px;background:#fff;
                  border-radius:8px;border-left:4px solid #4f8ef7">
        <p style="margin:0;color:#333;white-space:pre-wrap">{message}</p>
      </div>
      <p style="margin-top:24px;color:#999;font-size:12px">
        Sent from your portfolio contact form
      </p>
    </div>
    """

    msg.attach(MIMEText(html, "html"))

    await aiosmtplib.send(
        msg,
        hostname="smtp.gmail.com",
        port=587,
        username=username,
        password=password,
        start_tls=True,
    )
    print(f"Email sent successfully to {to_email}")




# Route 4 — Contact form
# React contact form calls: POST http://localhost:8000/api/contact
@app.post("/api/contact", response_model=ContactResponse)
async def contact(body: ContactRequest):
    print(f"\n New message from {body.name} <{body.email}>")
    print(f"   Subject: {body.subject}")
    print(f"   Message: {body.message}")
    print("-" * 40)

    # Send email
    try:
        await send_email(body.name, body.email, body.subject, body.message)
    except Exception as e:
        print(f"Email error: {e}")

    return ContactResponse(
        success=True,
        message="Message received! Umamahesh will get back to you soon."
    )

# ← ADD ROUTE 5 RIGHT HERE ↓

@app.get("/api/skills")
def get_skills():
    return [
        {
            "id": 1,
            "category": "AI & Machine Learning",
            "icon": "🧠",
            "items": ["PyTorch", "TensorFlow", "Scikit-learn", "Transformers", "Hugging Face", "ONNX"]
        },
        {
            "id": 2,
            "category": "Computer Vision",
            "icon": "👁️",
            "items": ["OpenCV", "YOLO", "Detectron2", "3D Perception", "Semantic Segmentation", "PointCloud"]
        },
        {
            "id": 3,
            "category": "Robotics & Perception",
            "icon": "🤖",
            "items": ["ROS2", "Sensor Fusion", "SLAM", "LiDAR", "Cognitive Robotics", "Kalman Filter"]
        },
        {
            "id": 4,
            "category": "Programming",
            "icon": "💻",
            "items": ["Python", "C++", "CUDA", "NumPy", "Pandas", "Matplotlib"]
        },
        {
            "id": 5,
            "category": "Backend & Tools",
            "icon": "⚙️",
            "items": ["FastAPI", "Docker", "Git", "Linux", "REST APIs", "PostgreSQL"]
        }
    ]

@app.get("/api/projects")
def get_projects():
    return [
        {
            "id": 1,
            "title": "Multimodal Transformer for Scene Understanding",
            "description": "Designed and trained a transformer-based architecture for multimodal scene perception, fusing camera and LiDAR inputs for robotic navigation.",
            "tech": ["PyTorch", "Transformers", "ROS2", "Python", "CUDA"],
            "github": "https://github.com/umamahesh",
            "live": None,
            "category": "AI Research",
            "featured": True
        },
        {
            "id": 2,
            "title": "Real-Time Object Detection for Robotics",
            "description": "Lightweight YOLO-based detection pipeline optimized for embedded robotic platforms, achieving 30+ FPS on edge hardware.",
            "tech": ["Python", "YOLO", "OpenCV", "ROS", "C++"],
            "github": "https://github.com/umamahesh",
            "live": None,
            "category": "Computer Vision",
            "featured": True
        },
        {
            "id": 3,
            "title": "3D Point Cloud Segmentation",
            "description": "Deep learning pipeline for semantic segmentation of 3D LiDAR point clouds applied to autonomous driving datasets.",
            "tech": ["Python", "PyTorch", "Open3D", "NumPy", "CUDA"],
            "github": "https://github.com/umamahesh",
            "live": None,
            "category": "Computer Vision",
            "featured": False
        },
        {
            "id": 4,
            "title": "Cognitive Robotics Perception System",
            "description": "Cognitive perception pipeline combining semantic segmentation, depth estimation, and spatial reasoning for robot decision-making.",
            "tech": ["Python", "C++", "ROS2", "TensorFlow", "PointCloud"],
            "github": "https://github.com/umamahesh",
            "live": None,
            "category": "Robotics",
            "featured": True
        },
        {
            "id": 5,
            "title": "FastAPI ML Inference Service",
            "description": "Production-ready REST API for serving PyTorch and ONNX models with async inference endpoints and Docker deployment.",
            "tech": ["FastAPI", "Python", "Docker", "ONNX", "PyTorch"],
            "github": "https://github.com/umamahesh",
            "live": None,
            "category": "Backend",
            "featured": False
        }
    ]