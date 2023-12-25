from flask import Flask
from sql.models import db, Creators, TrainingData
from datetime import datetime
from creator_endpoints.crud import creators_blueprint
from qanda_endpoint.crud import training_data_blueprint
import os
from dotenv import load_dotenv
load_dotenv()

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv("DB_CONNECTION_STRING") 

# Initialize the extension with the Flask app
db.init_app(app)
app.register_blueprint(creators_blueprint)
app.register_blueprint(training_data_blueprint)

# Create tables
with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)