import axios from "axios";
import { useEffect, useState } from "react";
import { Grid, GridItem } from "@chakra-ui/react";
import { Link } from "react-router-dom";

type character = {
  autohealth: number;
  defense: number;
  id: number;
  id_weapon_selected: number;
  name: string;
  weapon_name: string | null;
};

function DashboardGet({ shouldFetch }: { shouldFetch: boolean }) {
  const [userData, setUserData] = useState<character[] | null>(null);

  useEffect(() => {
    const tokenData = localStorage.getItem("token");
    if (tokenData) {
      const token = JSON.parse(tokenData); // Convertir de cadena JSON a objeto
      const accessToken = token.access_token; // Acceder a la propiedad access_token
      // const tokenType = token.token_type; // Acceder a la propiedad token_type
      // console.log("Access Token:", accessToken);
      // console.log("Token Type:", tokenType);

      if (accessToken) {
        axios
          .get("http://127.0.0.1:8000/api/characters/", {
            headers: {
              Authorization: `Bearer ${accessToken}`, // Usar el token en el header
            },
          })
          .then((response) => {
            setUserData(response.data);
          })
          .catch((error) => {
            console.error("Error al obtener datos del usuario", error);
            // console.log(token);
          });
      }
    }
    //console.log(userData);
  }, [shouldFetch]);
  return (
    <div>
      <h1>Personajes: </h1>
      <Grid templateColumns={"repeat(2,1fr)"} gap={2}>
        {userData ? (
          userData.map((character) => (
            <Link
              style={{ textDecoration: "none", color: "inherit" }}
              to={`/character/${character.id}`}
              key={character.id}
            >
              <GridItem
                style={{
                  margin: "5px",
                  border: "1px solid #ccc",
                  padding: "10px",
                }}
              >
                <p>Nombre: {character.name}</p>
                <p>Defensa: {character.defense}</p>
                <p>Autohealth: {character.autohealth}</p>
                <p>
                  Arma seleccionada: {character.id_weapon_selected ?? "Ninguna"}
                </p>
              </GridItem>
            </Link>
          ))
        ) : (
          <div>Cargando...</div>
        )}
      </Grid>
    </div>
  );
}

export default DashboardGet;
