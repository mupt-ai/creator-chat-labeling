import psycopg2
from psycopg2 import sql
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://username:password@localhost/dbname'  # Replace with your actual database URI
db = SQLAlchemy(app)

def connect_and_select_all(host, database, user, password):
    try:
        connection = psycopg2.connect(
            host=host,
            database=database,
            user=user,
            password=password
        )
        print("Connected to the database")

        return connection

    except (Exception, psycopg2.Error) as error:
        print("Error connecting to PostgreSQL:", error)
