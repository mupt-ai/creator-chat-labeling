import os

from deepgram import Deepgram
from dotenv import load_dotenv
from google.cloud import storage

from sql.models import Creators, YoutubeTranscripts, db

load_dotenv()

DEEPGRAM_API_KEY = os.getenv("DEEPGRAM_API_KEY")
TRANSCRIPT_BUCKET_NAME = os.getenv("TRANSCRIPT_BUCKET_NAME")
PARAMS = {"punctuate": True, "tier": "enhanced"}


async def transcribe_and_upload(video_id: str, creator_id: int):

    # Next, check whether video_id already exists in YouTubeTranscripts table
    transcript = YoutubeTranscripts.query.filter_by(video_id=video_id).first()

    if transcript:
        return True

    # Next, transcribe video
    deepgram = Deepgram(DEEPGRAM_API_KEY)
    audio_link = f"./videos/{video_id}.mp3"

    with open(audio_link, "rb") as audio:
        source = {"buffer": audio, "mimetype": "audio/mp3"}
        response = await deepgram.transcription.prerecorded(source, PARAMS)

    video_words = response["results"]["channels"][0]["alternatives"][0]["transcript"]
    os.remove(audio_link)

    # Next, upload transcript to Google Cloud Storage
    blob_name = f"{video_id}.txt"
    with open(f"{video_id}.txt", "w") as fp:
        fp.write(video_words)

    storage_client = storage.Client()
    bucket = storage_client.bucket(TRANSCRIPT_BUCKET_NAME)
    blob = bucket.blob(blob_name)
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
