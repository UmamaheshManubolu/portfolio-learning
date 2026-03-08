import os
from dotenv import load_dotenv
from openai import OpenAI

# Load environment variables from .env file
load_dotenv()

# Initialize OpenAI client
client = OpenAI()

print("=" * 50)
print("Ask GPT Anything!")
print("=" * 50 )

user_input = input("Enter your question: ")

response = client.chat.completions.create(
    model="gpt-4o-mini",
    max_tokens=500,
    messages=[
        {"role": "user", "content": user_input}
    ]
)

print("\nGPT Response:")
print("-" * 50)
print(response.choices[0].message.content)
print("-" * 50)