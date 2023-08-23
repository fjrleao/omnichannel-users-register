from http import HTTPStatus
from flask import request, json, jsonify

from app.models.users_models import User


def create_user():
    data = request.get_json()

    new_user = User(**data)
    new_user.save()

    return jsonify(json.loads(new_user.to_json())), HTTPStatus.CREATED
