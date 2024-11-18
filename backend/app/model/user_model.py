import peewee

from app.utils.db import db

class User(peewee.Model):
    username = peewee.CharField(unique = True, index = True)
    password = peewee.CharField()

    class Meta:
        database = db

