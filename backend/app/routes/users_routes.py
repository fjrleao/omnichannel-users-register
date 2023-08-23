from flask import Blueprint
from app.controllers.users_controllers import create_user

bp_user = Blueprint("bp_user", __name__, url_prefix='/users')


bp_user.post('')(create_user)
