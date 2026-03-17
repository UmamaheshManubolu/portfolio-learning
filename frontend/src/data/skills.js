// src/data/skills.js
// Static fallback data — used if FastAPI is offline

const skills = [
  {
    id: 1,
    category: "AI & Machine Learning",
    icon: "🧠",
    items: ["PyTorch", "TensorFlow", "Scikit-learn", "Transformers", "Hugging Face", "ONNX"]
  },
  {
    id: 2,
    category: "Computer Vision",
    icon: "👁️",
    items: ["OpenCV", "YOLO", "Detectron2", "3D Perception", "Semantic Segmentation", "PointCloud"]
  },
  {
    id: 3,
    category: "Robotics & Perception",
    icon: "🤖",
    items: ["ROS2", "Sensor Fusion", "SLAM", "LiDAR", "Cognitive Robotics", "Kalman Filter"]
  },
  {
    id: 4,
    category: "Programming",
    icon: "💻",
    items: ["Python", "C++", "CUDA", "NumPy", "Pandas", "Matplotlib"]
  },
  {
    id: 5,
    category: "Backend & Tools",
    icon: "⚙️",
    items: ["FastAPI", "Docker", "Git", "Linux", "REST APIs", "PostgreSQL"]
  }
];

export default skills;
