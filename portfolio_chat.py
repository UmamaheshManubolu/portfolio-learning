# GPT now remembers the ENTIRE conversation
# The secret: we keep a list of all messages and send the full list every time

import os 
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()  # Load environment variables from .env file
client = OpenAI()

SYSTEM_PROMPT = """
You are the personal AI assistant for Umamahesh Manubolu's portfolio website.

CRITICAL FACTS - ALWAYS USE THESE, NEVER MAKE UP DIFFERENT VALUES:
- Full Name: Umamahesh Manubolu
- Location: Germany
- Email: umamahesh.manubolu8@gmail.com
- LinkedIn: https://www.linkedin.com/in/umamahesh-manubolu/
- Role: AI Research Engineer
- Experience: 3+ years

BIO: Research-focused AI Engineer with 3+ years in Machine Learning,
Computer Vision, Cognitive Robotics, and Intelligent Perception in
Technical Systems. Strong foundation in applied mathematics with
advanced Python and C++ programming skills.

SKILLS:
- AI/ML: PyTorch, TensorFlow, Scikit-learn, Transformers, Hugging Face
- Computer Vision: OpenCV, YOLO, 3D Perception, Semantic Segmentation
- Robotics: ROS2, Sensor Fusion, SLAM, LiDAR, Cognitive Robotics
- Programming: Python, C++, CUDA
- Backend: FastAPI, Docker

EXPERIENCE:
- AI Research Engineer (2022 - Present)
  Designing transformer architectures for multimodal robotic perception
  Building real-time computer vision pipelines with LiDAR and camera fusion

AVAILABILITY: Open to new opportunities

STRICT RULES:
1. Answer professionally and friendly
2. Keep answers to 2-3 sentences maximum
3. ALWAYS use Germany when asked about location
4. ALWAYS use umamahesh.manubolu8@gmail.com when mentioning email
5. NEVER invent information not listed above
6. If unknown, say: "Please reach out at umamahesh.manubolu8@gmail.com"
"""

# ============================================================
# THIS is how memory works — just a Python list of messages
# Every time we send a request, we send the ENTIRE list
# GPT reads all previous messages and understands the context
# ============================================================

conversation_history = [
    {"role": "system", "content": SYSTEM_PROMPT}  # always the first message
]

print("=" * 50)
print("💬 Umamahesh's Portfolio Chat (with Memory)")
print("Commands: 'quit' to exit | 'history' to see chat | 'clear' to reset")
print("=" * 50)

while True:
    user_input = input("\nYou: ").strip()

    # --- Commands ---
    if user_input.lower() == "quit":
        print("Goodbye!")
        break

    if user_input.lower() == "clear":
        # Reset memory — start fresh
        conversation_history = [
            {"role": "system", "content": SYSTEM_PROMPT}
        ]
        print("🔄 Memory cleared! Starting fresh.")
        continue

    if user_input.lower() == "history":
        print("\n--- Full conversation so far ---")
        for i, msg in enumerate(conversation_history):
            if msg["role"] == "system":
                continue  # skip system prompt, too long to print
            label = "You" if msg["role"] == "user" else "Assistant"
            print(f"{label}: {msg['content']}")
        print("--- End ---")
        continue

    if not user_input:
        continue

    # --- Add user message to history ---
    conversation_history.append({
        "role": "user",
        "content": user_input
    })

    print("\n⏳ Thinking...\n")

    # --- Send FULL history to GPT ---
    # This is the key line — we send ALL previous messages, not just the latest
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        max_tokens=300,
        messages=conversation_history  # ← entire conversation every time
    )

    reply = response.choices[0].message.content

    # --- Add GPT reply to history too ---
    conversation_history.append({
        "role": "assistant",
        "content": reply
    })

    # --- Show how many messages in memory ---
    msg_count = len([m for m in conversation_history if m["role"] != "system"])
    print(f"Assistant: {reply}")
    print(f"[Memory: {msg_count} messages stored]")