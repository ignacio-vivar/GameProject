import { Flex } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import useGetChar from "../hooks/useGetChar";
import useUpdateChar from "../hooks/useUpdateChar";
import {
  characterUpdateForm,
  characterUpdateSchema,
} from "../schemas/characterUpdate";

interface CharacterGetProps {
  id: string;
}

function CharacterUpdate({ id }: CharacterGetProps) {
  const { handleGetChar, userData } = useGetChar();
  const { handleUpdateChar } = useUpdateChar();
  handleGetChar(id);

  const charData = userData?.[0];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<characterUpdateForm>({
    resolver: zodResolver(characterUpdateSchema),
  });

  const onSubmit = async (data: characterUpdateForm) => {
    const filteredData = Object.fromEntries(
      Object.entries(data).filter(([_key, value]) => value !== "")
    );
    console.log(filteredData);
    await handleUpdateChar(id, filteredData);
    window.location.reload();
  };
  return (
    <Flex m={5}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name Character
          </label>
          <input
            {...register("name")}
            type="text"
            className="form-control"
            id="name"
            defaultValue={charData?.name}
          />
          {errors?.name?.message ?? <p>{errors?.name?.message}</p>}
        </div>
        <div className="mb-3">
          <label htmlFor="defense" className="form-label">
            Defense
          </label>
          <input
            {...register("defense")}
            type="text"
            className="form-control"
            id="defense"
            defaultValue={charData?.defense}
          />
          {errors?.defense?.message ?? <p>{errors?.defense?.message}</p>}
        </div>

        <div className="mb-3">
          <label htmlFor="autoHealth" className="form-label">
            AutoHealth
          </label>
          <input
            {...register("autohealth")}
            type="text"
            className="form-control"
            id="autohealth"
            defaultValue={charData?.autohealth}
          />
          {errors?.autohealth?.message ?? <p>{errors?.autohealth?.message}</p>}
        </div>

        <div className="mb-3">
          <label htmlFor="weapon_name" className="form-label">
            Weapon_Name
          </label>
          <select
            {...register("weapon_name")}
            className="form-control"
            id="weapon_name"
            defaultValue={""}
          >
            <option value="" disabled>
              Select a weapon
            </option>
            <option value="Excalibur">Excalibur</option>
            <option value="NitroExp">NitroExp</option>
          </select>
          {errors?.weapon_name?.message ?? (
            <p>{errors?.weapon_name?.message}</p>
          )}
        </div>
        <button type="submit" className="btn btn-primary">
          Crear Personaje
        </button>
      </form>
    </Flex>
  );
}

export default CharacterUpdate;
