// src/data/projects.js
// Static fallback — used if FastAPI is offline

const projects = [
  {
    id: 1,
    title: "Multimodal Transformer for Scene Understanding",
    description: "Designed and trained a transformer-based architecture for multimodal scene perception, fusing camera and LiDAR inputs for robotic navigation.",
    tech: ["PyTorch", "Transformers", "ROS2", "Python", "CUDA"],
    github: "https://github.com/umamahesh",
    live: null,
    category: "AI Research",
    featured: true
  },
  {
    id: 2,
    title: "Real-Time Object Detection for Robotics",
    description: "Implemented a lightweight YOLO-based object detection pipeline optimized for embedded robotic platforms, achieving 30+ FPS on edge hardware.",
    tech: ["Python", "YOLO", "OpenCV", "ROS", "C++"],
    github: "https://github.com/umamahesh",
    live: null,
    category: "Computer Vision",
    featured: true
  },
  {
    id: 3,
    title: "3D Point Cloud Segmentation",
    description: "Deep learning pipeline for semantic segmentation of 3D LiDAR point clouds applied to autonomous driving datasets with high mIoU scores.",
    tech: ["Python", "PyTorch", "Open3D", "NumPy", "CUDA"],
    github: "https://github.com/umamahesh",
    live: null,
    category: "Computer Vision",
    featured: false
  },
  {
    id: 4,
    title: "Cognitive Robotics Perception System",
    description: "Built a cognitive perception pipeline combining semantic segmentation, depth estimation, and spatial reasoning for intelligent robot decision-making.",
    tech: ["Python", "C++", "ROS2", "TensorFlow", "PointCloud"],
    github: "https://github.com/umamahesh",
    live: null,
    category: "Robotics",
    featured: true
  },
  {
    id: 5,
    title: "FastAPI ML Inference Service",
    description: "Production-ready REST API for serving PyTorch and ONNX models with async inference endpoints, request batching, and Docker deployment.",
    tech: ["FastAPI", "Python", "Docker", "ONNX", "PyTorch"],
    github: "https://github.com/umamahesh",
    live: null,
    category: "Backend",
    featured: false
  }
];

export default projects;
