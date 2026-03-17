// src/data/experience.js
// Static fallback data for Experience section

const experience = [
  {
    id: 1,
    role: "AI Research Engineer",
    company: "Your Company",
    location: "Germany",
    period: "2022 – Present",
    type: "Full-time",
    highlights: [
      "Designed transformer architectures for multimodal robotic perception",
      "Built real-time computer vision pipelines with LiDAR and camera fusion",
      "Optimized models for edge deployment using ONNX and TensorRT",
    ],
    tech: ["PyTorch", "Python", "C++", "ROS2", "CUDA"],
  },
  {
    id: 2,
    role: "Machine Learning Engineer",
    company: "Previous Company",
    location: "Germany",
    period: "2020 – 2022",
    type: "Full-time",
    highlights: [
      "Built deep learning models for image classification and detection",
      "Implemented data pipelines for large-scale dataset preprocessing",
      "Developed C++ modules for real-time sensor data processing",
    ],
    tech: ["TensorFlow", "Python", "C++", "OpenCV", "ROS"],
  },
];

export default experience;