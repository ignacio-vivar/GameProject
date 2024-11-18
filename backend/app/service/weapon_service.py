from fastapi import HTTPException, status
from app.schema import weapon_schema
from app.schema import user_schema
from app.model.weapon_model import Weapon as WeaponModel

def create_weapon(weapon : weapon_schema.WeaponBase, user: user_schema.User):
    
    if (user.username == "adminChar"):
        db_weapon = WeaponModel(
            name = weapon.name,
            damage = weapon.damage
        )

        db_weapon.save()

        return weapon_schema.WeaponBase(
            id = db_weapon.id,
            name = db_weapon.name,
            damage = db_weapon.damage
        )
    else:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail = "Your not allowed for create weapons"
        ) 

def get_current_weapon(weaponName: str):
    
    
    weapon_selected = (WeaponModel.filter(WeaponModel.name == weaponName)).first()


    if not weapon_selected:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail = "No weapon has been found"
        ) 
    
    return weapon_schema.WeaponBase(
        id = weapon_selected.id,
        name = weapon_selected.name,
        damage = weapon_selected.damage
    )
    
def get_all_weapons():
        
    weapons = (WeaponModel.select())


    if not weapons:
         raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail = "Not weapons availables"
        ) 
    list_weapons = []

    for weapon in weapons:
        
        list_weapons.append(
            weapon_schema.WeaponBase(
                id = weapon.id,
                name = weapon.name,
                damage = weapon.damage
            )
        )
    
    return list_weapons