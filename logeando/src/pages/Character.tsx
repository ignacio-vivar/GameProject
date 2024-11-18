import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import CharacterGet from "../components/CharacterGet";
import useDeleteChar from "../hooks/useDeleteChar";
import CharacterUpdate from "../components/CharacterUpdate";
import { Flex } from "@chakra-ui/react";
function Character() {
  const navigate = useNavigate();
  const { handleDelete } = useDeleteChar();

  const { id } = useParams<{ id: string }>();

  const deleteChar = (id: string | undefined) => {
    if (!id) {
      console.error("El ID del personaje no está definido.");
      return;
    }
    handleDelete(id);
    navigate("/dashboard");
  };
  const navigateBack = () => {
    navigate("/dashboard");
  };
  return (
    <div>
      Character Details
      <p> El id de este personaje es: {id}</p>
      <Flex
        dir={"column"}
        alignItems={"center"}
        justifyContent={"space-around"}
      >
        {id ? <CharacterGet id={id} /> : <p>Loading Char...</p>}
        {id ? <CharacterUpdate id={id} /> : <p>Loading Form</p>}
      </Flex>
      <button
        onClick={() => id && deleteChar(id)}
        type="submit"
        className="btn btn-danger"
        style={{
          position: "absolute",
          bottom: "10px", // Ajusta según tu preferencia
          right: "10px", // Cambia a `left` si prefieres alinearlo hacia la izquierda
        }}
      >
        Borrar personaje
      </button>
      <button
        onClick={navigateBack}
        type="submit"
        className="btn btn-info"
        style={{
          position: "absolute",
          bottom: "10px", // Ajusta según tu preferencia
          left: "10px", // Cambia a `left` si prefieres alinearlo hacia la izquierda
        }}
      >
        Volver hacía atras
      </button>
    </div>
  );
}

export default Character;
