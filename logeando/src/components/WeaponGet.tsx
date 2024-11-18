import { useEffect } from "react";
import useGetWeapon from "../hooks/useGetWeapon";

function WeaponGet() {
  const { handleGetWeapon, weaponData } = useGetWeapon();

  useEffect(() => {
    handleGetWeapon();
  }, []);

  return (
    <div>
      <h1>Listado de Armas</h1>
      {weaponData?.map((weapon) => (
        <div
          key={weapon.id}
          style={{
            margin: "5px",
            border: "1px solid #ccc",
            padding: "10px",
          }}
        >
          <p>{weapon.name}</p>
          <p>{weapon.damage}</p>
        </div>
      ))}
    </div>
  );
}

export default WeaponGet;
