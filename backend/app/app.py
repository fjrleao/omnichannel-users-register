from os import environ
from flask import Flask
from mongoengine import connect
from dotenv import load_dotenv

from app.routes.users_routes import bp_user

load_dotenv()


def create_app():

    app = Flask(__name__)

    connect(host=environ.get('MONGODB_URI'))

    app.register_blueprint(bp_user)

    return app
