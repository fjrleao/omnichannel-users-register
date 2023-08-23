from flask import request, json, jsonify
from http import HTTPStatus


def create_user():
    data = request.get_json()

    data["_id"] = 1

    return jsonify(data), HTTPStatus.CREATED
