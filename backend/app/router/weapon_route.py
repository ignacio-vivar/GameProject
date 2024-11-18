from fastapi import APIRouter, Depends
from fastapi import status
from app.schema import weapon_schema
from app.utils.db import get_db
from app.service import weapon_service
from app.schema.user_schema import User
from app.service.auth_service import get_current_user
from typing import List

router = APIRouter(prefix="/api/weapons")


@router.post("/",
             tags=["make-weapon"],
             status_code=status.HTTP_201_CREATED,
             response_model=weapon_schema.WeaponBase,
             dependencies=[Depends(get_db)],
             summary= "Create Weapons Only Admin")
def create_weapon(
    weapon: weapon_schema.WeaponBase,
    current_user: User = Depends(get_current_user)
):
    return weapon_service.create_weapon(weapon,current_user)


@router.get(
        "/",
        tags=["get-weapon_byname"],
        status_code=status.HTTP_200_OK,
        response_model= weapon_schema.WeaponBase,
        dependencies=[Depends(get_db)]
)
def get_weapons(weapon):
        return weapon_service.get_current_weapon(weapon)

@router.get(
      "/allWP",
      tags=["get_all_weapons"],
      status_code=status.HTTP_200_OK,
      response_model= List[weapon_schema.WeaponBase],
      dependencies=[Depends(get_db)],
      summary="Get All Weapons"
)
def give_all():
      return weapon_service.get_all_weapons()