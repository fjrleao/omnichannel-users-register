from os import environ
from http import HTTPStatus
import requests
from flask import request, json, jsonify
from mongoengine import FieldDoesNotExist, ValidationError, NotUniqueError
from pymongo.errors import DuplicateKeyError

from app.models.users_models import User
from dotenv import load_dotenv

load_dotenv()


def create_user():
    try:

        data = request.get_json()

        valid_zip_code = requests.get(
            f'{environ.get("VIACEP_BASE_URL")}/{data["address"]["zip_code"]}/json'
        )

        if valid_zip_code.status_code == 400:
            return jsonify({'message': 'Invalid address'}), HTTPStatus.BAD_REQUEST

        new_user = User(**data)
        new_user.save()

        return jsonify(json.loads(new_user.to_json())), HTTPStatus.CREATED
    except FieldDoesNotExist as exception:
        return jsonify({'message': str(exception)}), HTTPStatus.BAD_REQUEST

    except ValidationError as exception:
        return jsonify({'message': str(exception)}), HTTPStatus.BAD_REQUEST

    except (DuplicateKeyError, NotUniqueError):
        return jsonify({'message': 'Register already exists'}), HTTPStatus.CONFLICT
