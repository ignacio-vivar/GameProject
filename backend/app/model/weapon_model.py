import peewee

from app.utils.db import db


class Weapon(peewee.Model):
    name = peewee.CharField(unique = True)
    damage = peewee.IntegerField()

    class Meta:
        database = db