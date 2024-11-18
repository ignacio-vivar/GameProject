import { Flex } from "@chakra-ui/react";
import WeaponGet from "../components/WeaponGet";
import WeaponPost from "../components/WeaponPost";
import { useNavigate } from "react-router-dom";
function Weapon() {
  const navigate = useNavigate();
  const toDashboard = () => {
    navigate("/dashboard");
  };
  return (
    <div>
      <h2> Weapon Page</h2>
      <Flex p={5}>
        <WeaponGet />
        <WeaponPost />
      </Flex>

      <button
        onClick={toDashboard}
        type="submit"
        className="btn btn-secondary"
        style={{
          position: "absolute",
          top: "10px", // Ajusta según tu preferencia
          right: "10px", // Cambia a `left` si prefieres alinearlo hacia la izquierda
        }}
      >
        Al Dashboard
      </button>
    </div>
  );
}

export default Weapon;
