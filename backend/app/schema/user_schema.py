from pydantic import BaseModel, Field

class UserBase(BaseModel):
    username: str = Field(
        ...,
        min_length=6,
        max_length=12,
        example="yourUserName"
    )

class User(UserBase):
    id: int = Field(
        ...,
        example="1"
    )

class UserRegister(UserBase):
    password: str = Field(
    ...,
    min_length=8,
    max_length=64,
    example="strongpass"
    )