import os

from deepgram import Deepgram
from dotenv import load_dotenv
from google.cloud import storage

from sql.models import YoutubeTranscripts, db
import json

load_dotenv()

DEEPGRAM_API_KEY = os.getenv("DEEPGRAM_API_KEY")
TRANSCRIPT_BUCKET_NAME = os.getenv("TRANSCRIPT_BUCKET_NAME")
PARAMS = {"punctuate": True, "tier": "enhanced"}

def format_script(data):
    
    script_lines = []

    current_speaker = None
    current_line = []

    speaker_to_count = {}

    for word_info in data:
        speaker_name = f"Speaker {word_info['speaker']}" if 'speaker' in word_info else "Unknown Speaker"
        speaker_to_count[speaker_name] = speaker_to_count.get(speaker_name, 0) + 1

        if current_speaker is None or current_speaker == speaker_name:
            current_line.append(word_info['word'])
        else:
            script_lines.append(f"[{current_speaker}] {' '.join(current_line)}")
            current_line = [word_info['word']]

        current_speaker = speaker_name

    # Add the last line
    if current_line:
        script_lines.append(f"[{current_speaker}] {' '.join(current_line)}")

    # Get the speaker with the most lines
    speaker_with_most_lines = max(speaker_to_count, key=speaker_to_count.get)

    # Replace all instances of [Speaker X] with [Interviewee]
    formatted_script = '\n'.join(script_lines)
    formatted_script = formatted_script.replace(f"[{speaker_with_most_lines}]", "[Interviewee]")

    return formatted_script


async def transcribe_and_upload(video_id: str, creator_id: int):

    # Next, check whether video_id already exists in YouTubeTranscripts table
    transcript = YoutubeTranscripts.query.filter_by(video_id=video_id).first()

    if transcript:
        return True

    # Next, check whether file already exists in Google Cloud Storage
    blob_name = f"{video_id}.txt"
    storage_client = storage.Client()
    bucket = storage_client.bucket(TRANSCRIPT_BUCKET_NAME)
    blob = bucket.blob(blob_name)

    if blob.exists():
        # Now, add entry with video_id and creator_id to YouTubeTranscripts table
        new_entry = YoutubeTranscripts(video_id=video_id, creator_id=creator_id)
        db.session.add(new_entry)
        db.session.commit()
        return True

    # Next, transcribe video
    deepgram = Deepgram(DEEPGRAM_API_KEY)
    audio_link = f"./videos/{video_id}.mp3"

    with open(audio_link, "rb") as audio:
        source = {"buffer": audio, "mimetype": "audio/mp3"}
        response = await deepgram.transcription.prerecorded(source, PARAMS, diarize=True)

    video_words = response["results"]["channels"][0]["alternatives"][0]["words"]
    video_words = format_script(video_words)
    os.remove(audio_link)

    # Next, upload transcript to Google Cloud Storage
    with open(f"{video_id}.txt", "w") as fp:
        fp.write(video_words)

    generation_match_precondition = 0
    blob.upload_from_filename(
        blob_name, if_generation_match=generation_match_precondition
    )
    os.remove(blob_name)

    # Now, add entry with video_id and creator_id to YouTubeTranscripts table
    new_entry = YoutubeTranscripts(video_id=video_id, creator_id=creator_id)
    db.session.add(new_entry)
    db.session.commit()

    return True
