import peewee

from app.utils.db import db

from app.model.character_model import Character
from app.model.weapon_model import Weapon

class Equipment(peewee.Model):
    
    id_weapon = peewee.ForeignKeyField(Weapon, on_delete="CASCADE", backref="equipment")
    id_character = peewee.ForeignKeyField(Character, on_delete="CASCADE", backref="equipment")

    class Meta:
        database = db
        primary_key = peewee.CompositeKey('id_weapon', 'id_character')  # Clave primaria compuesta
