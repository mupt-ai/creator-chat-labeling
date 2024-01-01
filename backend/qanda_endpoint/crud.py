from flask import Blueprint, request

from qanda_endpoint.openai import get_response_json
from qanda_endpoint.transcribe import transcribe_and_upload
from qanda_endpoint.youtube_dl import download_youtube_link
from sql.models import Creators, TrainingData, YoutubeTranscripts, db

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

@training_data_blueprint.route("/videos", methods=["GET", "DELETE"])
def videos():
    if request.method == "GET":
        creator_id = request.args.get("creator_id")
        page = request.args.get("page")
        page_size = request.args.get("page_size")

        creator = Creators.query.filter_by(id=creator_id).first()
        if not creator:
            return {"message": "Invalid creator_id!"}
        
        videos = YoutubeTranscripts.query.filter_by(creator_id=creator_id).paginate(page=int(page), per_page=int(page_size), error_out=False).items

        return [
            {"id": video.id, "video_id": video.video_id}
            for video in videos
        ]
    elif request.method == "DELETE":
        id = request.args.get("id")
        YoutubeTranscripts.query.filter_by(id=id).delete()
        db.session.commit()

        return {"message": "Video deleted successfully!"}

@training_data_blueprint.route("/numVideoPages", methods=["GET"])
def get_num_video_pages():
    if request.method == "GET":
        creator_id = request.args.get("creator_id")
        page_size = request.args.get("page_size")

        creator = Creators.query.filter_by(id=creator_id).first()
        if not creator:
            return {"message": "Invalid creator_id!"}
        
        num_pages = YoutubeTranscripts.query.filter_by(creator_id=creator_id).count() // int(page_size) + 1

        return {"num_pages": num_pages}

@training_data_blueprint.route(
    "/training_data", methods=["POST", "GET", "DELETE", "PUT"]
)
def training_data():
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
    elif request.method == "GET":
        creator_id = request.args.get("creator_id")

        training_data = TrainingData.query.filter_by(creator_id=creator_id).all()

        return [
            {"id": data.id, "question": data.question, "answer": data.answer}
            for data in training_data
        ]

    elif request.method == "DELETE":
        qanda_id = request.args.get("id")
        TrainingData.query.filter_by(id=qanda_id).delete()
        db.session.commit()

        return {"message": "Training data deleted successfully!"}
    elif request.method == "PUT":
        qanda_id = request.args.get("id")
        question = request.args.get("question")
        answer = request.args.get("answer")

        entry = TrainingData.query.filter_by(id=qanda_id).first()
        entry.question = question
        entry.answer = answer
        db.session.commit()

        return {"message": "Training data updated successfully!"}
