from pydantic import BaseModel

class EquipmentSchema(BaseModel):
    id_weapon: int
    id_character: int

    class Config:
        orm_mode = True
