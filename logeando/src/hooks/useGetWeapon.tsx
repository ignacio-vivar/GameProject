import axios from "axios";
import { useState } from "react";

type Weapon = {
  id: number;
  name: string;
  damage: number;
};

export default function useGetWeapon() {
  const [weaponData, setWeaponData] = useState<Weapon[]>();
  const [error, setError] = useState<string | null>(null);

  const handleGetWeapon = () => {
    const tokenData = localStorage.getItem("token");
    if (!tokenData) {
      setError("No se encontró un token en localStorage.");
      return;
    }

    const token = JSON.parse(tokenData);
    const accessToken = token.access_token;

    if (accessToken) {
      axios
        .get("http://127.0.0.1:8000/api/weapons/allWP")
        .then((response) => {
          setWeaponData(response.data);
          setError(null); // Limpiar errores anteriores si la solicitud fue exitosa
        })
        .catch((error) => {
          console.error("Error al obtener datos del usuario", error);
          setError("Error al obtener datos del usuario.");
        });
    }
  };
  return { weaponData, error, handleGetWeapon };
}
