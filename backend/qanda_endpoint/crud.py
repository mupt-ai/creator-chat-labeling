from flask import Blueprint, request
from sql.models import db, Creators

import os 

from qanda_endpoint.youtube_dl import download_youtube_link
from qanda_endpoint.transcribe import transcribe_and_upload

training_data_blueprint = Blueprint('training_data', __name__)
@training_data_blueprint.route('/download_video', methods=['POST'])
async def download_video():
    if request.method == 'POST':
        video_url = request.args.get('video_url')
        creator_id = request.args.get('creator_id')

        # Check whether valid creator_id
        creator = Creators.query.filter_by(id=creator_id).first()
        if not creator:
            return {'message': 'Invalid creator_id!'}
    
        video_id = download_youtube_link(video_url) 
        response = await transcribe_and_upload(video_id, creator_id)

        if response:
            return {'message': 'Video downloaded and transcript uploaded successfully!'}
        else:
            return {'message': 'Error downloading video!'}