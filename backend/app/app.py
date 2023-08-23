from flask import Flask
from app.routes.users_routes import bp_user


def create_app():

    app = Flask(__name__)

    app.register_blueprint(bp_user)

    return app
