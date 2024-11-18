from fastapi import APIRouter, Depends, Body
from fastapi import status

from app.schema import character_schema
from app.service import character_service
from app.utils.db import get_db
from app.schema.user_schema import User
from app.service.auth_service import get_current_user


from typing import List

router = APIRouter(prefix="/api/characters")


@router.post(
    "/",
    tags=["make-character"],
    status_code=status.HTTP_201_CREATED,
    response_model=character_schema.CharacterResponse,
    dependencies=[Depends(get_db)]
)
def create_char(
    char: character_schema.CharacterBase = Body(...),
    current_user: User = Depends(get_current_user)):
        return character_service.create_character(char, current_user)


@router.patch(
    "/{id}",
    tags=["update-character"],
    status_code=status.HTTP_200_OK,
    response_model=character_schema.CharacterResponseUpdate,
    dependencies=[Depends(get_db)]
)
def update_char(
    id: int,  # El ID del personaje a actualizar
    char: character_schema.CharacterUpdate = Body(...),  # Los datos a actualizar
    current_user: User = Depends(get_current_user),  # El usuario actual
):
    # 4. Llamar al servicio para actualizar los datos del personaje
    updated_character = character_service.update_character(id, char, current_user)
    
    return updated_character

@router.get(
        "/",
        tags=["get-characters"],
        status_code=status.HTTP_200_OK,
        response_model= List[character_schema.CharacterResponse],
        dependencies=[Depends(get_db)]
)
def get_chars(
        user: User= Depends(get_current_user)
):
        return character_service.get_chars(user)

@router.get(
        "/id",
        tags=["get-characters-by-id"],
        status_code=status.HTTP_200_OK,
        response_model= List[character_schema.CharacterResponse],
        dependencies=[Depends(get_db)]
)
def get_chars_by_id(id: int,
        user: User= Depends(get_current_user), 
):
        return character_service.get_chars_id(id, user)

@router.delete(
        "/deleteAll",
        tags=["delete_all_chars"],
        status_code=status.HTTP_200_OK,
        dependencies=[Depends(get_db)]
)
def delete_all_chars(user: User=Depends(get_current_user)):
        return character_service.delete_all_chars(user)

@router.delete(
        "/delete_char",
        tags=["delete_id_char"],
        status_code=status.HTTP_200_OK,
        dependencies=[Depends(get_db)]
)
def delete_all_chars(id:int, user: User=Depends(get_current_user)):
        return character_service.delete_char_by_id(id, user)