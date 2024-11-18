import peewee

from app.model.user_model import User
from app.model.weapon_model import Weapon

from app.utils.db import db

class Character(peewee.Model):
    # atributos
    name = peewee.CharField(index = True)
    defense = peewee.IntegerField()
    autohealth = peewee.IntegerField()

    # id, foreign
    id_user = peewee.ForeignKeyField(User, on_delete="CASCADE", backref="characters")
    id_weapon_selected = peewee.ForeignKeyField(Weapon, on_delete="SET NULL", backref="characters")
    
    class Meta:
        database = db