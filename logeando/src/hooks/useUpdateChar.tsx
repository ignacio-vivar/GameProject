import axios from "axios";
import { useState } from "react";

type Character = {
  autohealth?: string;
  defense?: string;
  id?: number;
  id_weapon_selected?: string;
  name?: string;
  weapon_name?: string | null;
};
export default function useUpdateChar() {
  const [userData, setUserData] = useState<Character[]>();
  const [error, setError] = useState<string | null>(null);

  const handleUpdateChar = (id: string, char: Character) => {
    const tokenData = localStorage.getItem("token");
    if (!tokenData) {
      setError("No se encontró un token en localStorage.");
      return;
    }

    const token = JSON.parse(tokenData); // Convertir de cadena JSON a objeto
    const accessToken = token.access_token;

    if (accessToken) {
      axios
        .patch(`http://127.0.0.1:8000/api/characters/${id}`, char, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          setUserData(response.data);
          setError(null); // Limpiar errores anteriores si la solicitud fue exitosa
        })
        .catch((error) => {
          console.error("Error al obtener datos del usuario", error);
          setError("Error al obtener datos del usuario.");
        });
    }

    if (error) {
      return <div>Error: {error}</div>;
    }
  };

  return { handleUpdateChar, userData };
}
