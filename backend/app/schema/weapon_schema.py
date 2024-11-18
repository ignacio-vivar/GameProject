from pydantic import BaseModel, Field
from typing import Optional


class WeaponBase(BaseModel):
    id: Optional[int] = None

    name: str = Field(
        ...,
        min_length=6,
        max_length=12,
        example="yourWeaponName"
    )

    damage: int = Field(
        ...,
        ge = 10,
        le = 1000,
        example="a number between 10-1000"
    )



