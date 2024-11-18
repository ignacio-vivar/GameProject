from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.router.user_route import router as user_router
from app.router.character_route import router as char_router
from app.router.weapon_route import router as weapon_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permite solicitudes desde cualquier dominio (solo en desarrollo)
    allow_credentials=True,
    allow_methods=["*"],  # Permite todos los métodos HTTP (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],  # Permite todos los encabezados HTTP
)


app.include_router(user_router)
app.include_router(char_router)
app.include_router(weapon_router)