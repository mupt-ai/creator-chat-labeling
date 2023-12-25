from flask import Blueprint, request

from qanda_endpoint.openai import get_response_json
from qanda_endpoint.transcribe import transcribe_and_upload
from qanda_endpoint.youtube_dl import download_youtube_link
from sql.models import Creators, TrainingData, db

training_data_blueprint = Blueprint("training_data", __name__)


@training_data_blueprint.route("/download_video", methods=["POST"])
async def download_video():
    if request.method == "POST":
        video_url = request.args.get("video_url")
        creator_id = request.args.get("creator_id")

        # Check whether valid creator_id
        creator = Creators.query.filter_by(id=creator_id).first()
        if not creator:
            return {"message": "Invalid creator_id!"}

        video_id = download_youtube_link(video_url)
        response = await transcribe_and_upload(video_id, creator_id)

        if response:
            return {"message": "Video downloaded and transcript uploaded successfully!"}
        else:
            return {"message": "Error downloading video!"}


@training_data_blueprint.route("/add_training_data", methods=["POST"])
def add_training_data():
    if request.method == "POST":
        creator_id = request.args.get("creator_id")
        n_questions = request.args.get("n_questions")
        video_id = request.args.get("video_id")

        qa_pairs = get_response_json(video_id, n_questions, creator_id)

        for pair in qa_pairs:
            new_entry = TrainingData(
                video_id=video_id,
                question=pair["question"],
                answer=pair["answer"],
                creator_id=creator_id,
            )
            db.session.add(new_entry)
            db.session.commit()

        return qa_pairs
