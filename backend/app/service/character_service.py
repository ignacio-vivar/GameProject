from fastapi import HTTPException, status
from app.schema import character_schema
from app.schema import user_schema
from app.model.character_model import Character as CharModel
from app.model.weapon_model import Weapon as WeaponModel

# Método para obtener personajes por usuario

def get_chars(user: user_schema.User):
    
    chars_user = (CharModel.filter(CharModel.id_user == user.id))

    if not chars_user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail = "No character available"
        ) 
    
    list_chars = []

    for char in chars_user:
        
        list_chars.append(
            character_schema.CharacterResponse(
                id = char.id,
                name= char.name,
                defense = char.defense,
                autohealth= char.autohealth,
                id_weapon_selected= char.id_weapon_selected.id if char.id_weapon_selected else None
            )
        )
    
    return list_chars

# Método para crear personaje
def get_chars_id(id: int ,user: user_schema.User):
    
    char_users = (CharModel.filter(CharModel.id_user == user.id))
    if not char_users:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail = "No character available"
        ) 
    
    char_user = [char for char in char_users if char.id == id]


    if not char_user:
         raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail = f"No character with this {id} available"
        ) 
    
    char_return = [
        character_schema.CharacterResponse(
            id=char.id,
            name=char.name,
            defense=char.defense,
            autohealth=char.autohealth,
            id_weapon_selected=char.id_weapon_selected.id if char.id_weapon_selected else None
        )
        for char in char_user
    ]
    
    return char_return

def create_character(chara: character_schema.CharacterBase, user: user_schema.User):
    weapon = None
    try:
        allchars = get_chars(user)
    except:
        allchars = []
        
    existing_char_names = [char.name for char in allchars]
   
    if chara.name in existing_char_names:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                    detail=f"Char {chara.name} is created already"
                )
    
    if chara.weapon_name:
        try:
            weapon = WeaponModel.get(WeaponModel.name == chara.weapon_name)
        except WeaponModel.DoesNotExist:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Weapon '{chara.weapon_name}' not found"
            )
        db_char = CharModel(
            name = chara.name,
            defense = chara.defense,
            autohealth = chara.autohealth,
            id_user = user.id,
            id_weapon_selected = weapon.id if weapon else None
        )

        db_char.save()

        return character_schema.CharacterResponse(
            id = db_char.id,
            name = db_char.name,
            defense= db_char.defense,
            autohealth= db_char.autohealth,
            id_weapon_selected= db_char.id_weapon_selected.id if db_char.id_weapon_selected else None
        )

 # Método para eliminar todos los personajes de un usuario

def delete_all_chars(user: user_schema.User):
    
    chars_user = (CharModel.filter(CharModel.id_user == user.id))


    if not chars_user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No chars founded"
        )
    delete_all =  CharModel.delete().where(CharModel.id_user == user.id).execute()

    return {"detail": f"{delete_all} characters to deleted"}

def delete_char_by_id(id: int ,user: user_schema.User):
    
    char_user_query = CharModel.select().where((CharModel.id_user == user.id) & (CharModel.id == id))


    if not char_user_query.exists():
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No chars found"
        )
    
     # Eliminar el registro
    deleted_rows = CharModel.delete().where((CharModel.id_user == user.id) & (CharModel.id == id)).execute()

    if deleted_rows == 0:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to delete the char"
        )

    return {"detail": f"Char with ID {id} has been deleted"}


def update_character(id: int, char: character_schema.CharacterUpdate, user: user_schema.User) -> character_schema.CharacterUpdate:
    
     # 1. Obtener el personaje de la base de datos
    character = get_chars_id(id, user)
    
    # 2. Verificar si el personaje existe
    if not character:
        raise HTTPException(status_code=404, detail="Character not found")


    # Obtener el personaje de la base de datos
    character = CharModel.filter(CharModel.id == id).first()
    
    if character:
        # Actualizar los campos del personaje
        if char.name:
            character.name = char.name
        if char.defense:
            character.defense = char.defense
        if char.autohealth:
            character.autohealth = char.autohealth
        if char.weapon_name:  # Si se envía un nombre de arma, buscar el arma y actualizar
            try:
                weapon = WeaponModel.get(WeaponModel.name == char.weapon_name)
                character.id_weapon_selected = weapon.id
            except WeaponModel.DoesNotExist:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail=f"Weapon '{char.weapon_name}' not found"
                )
        
        if not any([char.name, char.defense, char.autohealth, char.weapon_name]):
            raise HTTPException(
        status_code=status.HTTP_400_BAD_REQUEST,
        detail="At least one field must be provided to update the character"
    )
        
        # Guardar los cambios automáticamente según la configuración del ORM
        character.save()  # Este método se usa en Peewee para guardar los cambios en el modelo

        return character_schema.CharacterResponseUpdate(
            id=character.id,
            name=character.name,
            defense=character.defense,
            autohealth=character.autohealth,
            # id_weapon_selected=character.id_weapon_selected
        )
    return None