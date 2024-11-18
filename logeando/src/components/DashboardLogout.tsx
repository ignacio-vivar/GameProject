import { Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function DashboardLogout() {
  const navigate = useNavigate();

  const onLogout = () => {
    console.log("Me voy a deslogear");
    navigate("/");
    localStorage.clear();
  };

  return (
    <Flex>
      <button
        onClick={onLogout}
        type="submit"
        className="btn btn-secondary"
        style={{
          position: "absolute",
          top: "10px", // Ajusta según tu preferencia
          right: "10px", // Cambia a `left` si prefieres alinearlo hacia la izquierda
        }}
      >
        Salir
      </button>
    </Flex>
  );
}

export default DashboardLogout;
