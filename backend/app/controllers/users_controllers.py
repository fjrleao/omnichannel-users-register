from http import HTTPStatus
from flask import request, json, jsonify
from mongoengine import FieldDoesNotExist, ValidationError, NotUniqueError
from pymongo.errors import DuplicateKeyError

from app.models.users_models import User


def create_user():
    try:

        data = request.get_json()

        new_user = User(**data)
        new_user.save()

        return jsonify(json.loads(new_user.to_json())), HTTPStatus.CREATED
    except FieldDoesNotExist as exception:
        return jsonify({'message': str(exception)}), HTTPStatus.BAD_REQUEST

    except ValidationError as exception:
        return jsonify({'message': str(exception)}), HTTPStatus.BAD_REQUEST

    except (DuplicateKeyError, NotUniqueError):
        return jsonify({'message': 'Register already exists'}), HTTPStatus.CONFLICT
