from app.model.character_model import Character
from app.model.user_model import User
from app.model.weapon_model import Weapon

from app.utils.db import db

def create_tables():
    with db:
        db.create_tables([Character, User, Weapon])
        