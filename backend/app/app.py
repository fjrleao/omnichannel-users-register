from os import environ
from flask import Flask
from flask_cors import CORS
from mongoengine import connect
from dotenv import load_dotenv

from app.routes.users_routes import bp_user

load_dotenv()


def create_app():

    app = Flask(__name__)
    app.config['CORS_HEADERS'] = 'Content-Type'

    connect(host=environ.get('MONGODB_URI'))

    CORS(bp_user)
    app.register_blueprint(bp_user)

    return app
