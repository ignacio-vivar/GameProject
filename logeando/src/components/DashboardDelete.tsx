import { Flex } from "@chakra-ui/react";
import useDeleteAll from "../hooks/useDeleteAll";

function DashboardDelete() {
  const { handleDelete } = useDeleteAll();

  const deleteRefresh = () => {
    handleDelete();
  };
  return (
    <Flex>
      <button
        onClick={deleteRefresh}
        type="submit"
        className="btn btn-danger"
        style={{
          position: "absolute",
          bottom: "10px", // Ajusta según tu preferencia
          left: "10px", // Cambia a `left` si prefieres alinearlo hacia la izquierda
        }}
      >
        Borrar Todo
      </button>
    </Flex>
  );
}

export default DashboardDelete;
