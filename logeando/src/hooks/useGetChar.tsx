import axios from "axios";
import { useEffect, useState } from "react";

type Character = {
  autohealth: string;
  defense: string;
  id: number;
  id_weapon_selected: string;
  name: string;
  weapon_name: string | null;
};
export default function useGetChar() {
  const [userData, setUserData] = useState<Character[]>();
  const [error, setError] = useState<string | null>(null);

  const handleGetChar = (id: string) => {
    useEffect(() => {
      if (!id) {
        setError("El ID del personaje no está definido.");
        return;
      }

      const tokenData = localStorage.getItem("token");
      if (!tokenData) {
        setError("No se encontró un token en localStorage.");
        return;
      }

      const token = JSON.parse(tokenData);
      const accessToken = token.access_token;

      if (accessToken) {
        axios
          .get(`http://127.0.0.1:8000/api/characters/id?id=${id}`, {
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
    }, [id]); // Solo ejecuta el efecto si `id` cambia

    if (error) {
      return <div>Error: {error}</div>;
    }
  };

  return { handleGetChar, userData };
}
