from datetime import datetime

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class Creators(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    date_created = db.Column(db.DateTime, default=datetime.utcnow)


class TrainingData(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    question = db.Column(db.String(2048), nullable=False)
    answer = db.Column(db.String(2048), nullable=False)
    creator_id = db.Column(db.Integer, nullable=False)
    video_id = db.Column(db.String(255), nullable=False)
    date_created = db.Column(db.DateTime, default=datetime.utcnow)
    __mapper_args__ = {'order_by': date_created.desc()}


class YoutubeTranscripts(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    creator_id = db.Column(db.Integer, nullable=False)
    video_id = db.Column(db.String(255), nullable=False)
