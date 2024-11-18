from pydantic import BaseModel
from pydantic import Field
from typing import Optional

class CharacterBase(BaseModel):
    name: str = Field(...,
                      min_length=5,
                      max_length=10,
                      example="Hughes",)
    defense: int = Field(...,
                         ge = 0,
                         le = 500,
                         example = "0-500")
    autohealth: int = Field(...,
                         ge = 0,
                         le = 100,
                         example = "0-100")
    weapon_name: Optional[str] = None


class CharacterUpdate(BaseModel):
    name: Optional[str] = Field(None,
                      min_length=5,
                      max_length=10,
                      example="Hughes",)
    defense: Optional[int] = Field(None,
                         ge = 0,
                         le = 500,
                         example = "0-500")
    autohealth: Optional[int] = Field(None,
                         ge = 0,
                         le = 100,
                         example = "0-100")
    weapon_name: Optional[str] = None

class CharacterResponse(CharacterBase):
    id: int
    id_weapon_selected: Optional[int] = None

class CharacterResponseUpdate(CharacterUpdate):
    id: int
    id_weapon_selected: Optional[int] = None