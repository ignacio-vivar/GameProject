import useGetChar from "../hooks/useGetChar";

interface CharacterGetProps {
  id: string;
}

function CharacterGet({ id }: CharacterGetProps) {
  const { handleGetChar, userData } = useGetChar();

  handleGetChar(id);

  return (
    <div>
      {userData ? (
        userData.map((char) => (
          <div
            key={char.id}
            style={{
              margin: "5px",
              border: "1px solid #ccc",
              padding: "10px",
            }}
          >
            <p>Nombre: {char.name}</p>
            <p>Defensa: {char.defense}</p>
            <p>Autohealth: {char.autohealth}</p>
            <p>Arma seleccionada: {char.id_weapon_selected ?? "Ninguna"}</p>
          </div>
        ))
      ) : (
        <p>No hay character</p>
      )}
    </div>
  );
}

export default CharacterGet;
