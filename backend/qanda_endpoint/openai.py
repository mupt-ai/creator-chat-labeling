import json
import os
import random
import re

from dotenv import load_dotenv
from google.cloud import storage
from openai import OpenAI

from sql.models import TrainingData, db

load_dotenv()

TRANSCRIPT_BUCKET_NAME = os.getenv("TRANSCRIPT_BUCKET_NAME")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

TEMPERATURE = 0.8
MAX_TOKENS = 1024
FREQUENCY_PENALTY = 0.5


def parse_text_string(text):
    qa_pairs = []

    # Use regular expression to find Q: A: pairs
    pattern = re.compile(r"Q: (.*?)(A: (.*?)(?=(Q:|$)))", re.DOTALL)
    matches = pattern.findall(text)

    for match in matches:
        question = match[0].strip()
        answer = match[2].strip()
        qa_pairs.append({"question": question, "answer": answer})

    return qa_pairs


def get_response_json(video_id: int, num_questions: int, creator_id: int):
    client = OpenAI(api_key=OPENAI_API_KEY)
    with open("prompt.txt", "r") as file:
        prompt = file.read()

    prompt = prompt.format(num_questions=num_questions)

    storage_client = storage.Client()
    bucket = storage_client.bucket(TRANSCRIPT_BUCKET_NAME)
    blob = bucket.blob(f"{video_id}.txt")
    transcript = blob.download_as_string().decode("utf-8")

    # First check if there already any questions and answers for this video
    # If there are, add them to the prompt

    training_data = TrainingData.query.filter_by(video_id=video_id).all()
    if training_data:
        prompt += "\n Here are some previous questions and answers: \n . Make any new questions AS DIFFERENT AS POSSIBLE from these. \n"
        # shuffle the training data so that the questions and answers are not in order
        random.shuffle(training_data)
        for data in training_data[:10]:
            prompt += f"Q: {data.question} A: {data.answer}\n\n"

    prompts = [
        {"role": "assistant", "content": prompt},
        {"role": "user", "content": transcript},
    ]

    response = (
        client.chat.completions.create(
            model="gpt-3.5-turbo-1106",
            messages=prompts,
            temperature=TEMPERATURE,
            max_tokens=MAX_TOKENS,
        )
        .choices[0]
        .message.content
    )

    qa_pairs = parse_text_string(response)
    return qa_pairs
