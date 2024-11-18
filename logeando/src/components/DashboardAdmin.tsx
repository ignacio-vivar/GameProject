import { useNavigate } from "react-router-dom";

type Props = {};

function DashboardAdmin({}: Props) {
  const navigate = useNavigate();
  const user = localStorage.getItem("user");

  const navigateWeapon = () => {
    navigate("/weapon");
  };
  if (user === "adminChar") {
    return (
      <div>
        <button
          onClick={navigateWeapon}
          className="btn btn-secondary"
          style={{
            position: "absolute",
            top: "10px", // Ajusta según tu preferencia
            left: "10px", // Cambia a `left` si prefieres alinearlo hacia la izquierda
          }}
        >
          {" "}
          DashboardAdmin {localStorage.getItem("user")}
        </button>
      </div>
    );
  }
}

export default DashboardAdmin;
