from fastapi import HTTPException, status

from app.model.user_model import User as UserModel
from app.schema import user_schema
from app.service.auth_service import get_password_hash

def create_user(user: user_schema.UserRegister):

    get_user = UserModel.filter(UserModel.username == user.username).first()
    if get_user:
        msg = "Email already registered"
        if get_user.username == user.username:
            msg = "Username already registered"
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=msg
        )

    db_user = UserModel(
        username=user.username,
        password=get_password_hash(user.password)
    )

    db_user.save()

    return user_schema.User(
        id = db_user.id,
        username = db_user.username,
    )