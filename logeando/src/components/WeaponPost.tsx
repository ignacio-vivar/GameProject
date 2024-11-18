import { Flex } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { weaponForm, weaponSchema } from "../schemas/weapon";
import usePostWeapon from "../hooks/usePostWeapon";

function WeaponPost() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<weaponForm>({ resolver: zodResolver(weaponSchema) });
  const { handlePostRequest } = usePostWeapon();

  const onSubmit = async (data: weaponForm) => {
    await handlePostRequest(data);
  };
  return (
    <Flex m={5}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name Weapon
          </label>
          <input
            {...register("name")}
            type="character"
            className="form-control"
            id="name"
          />
          {errors?.name?.message ?? <p>{errors?.name?.message}</p>}
        </div>
        <div className="mb-3">
          <label htmlFor="damage" className="form-label">
            Damage
          </label>
          <input
            {...register("damage")}
            type="number"
            className="form-control"
            id="damage"
          />
          {errors?.damage?.message ?? <p>{errors?.damage?.message}</p>}
        </div>
        <button type="submit" className="btn btn-primary">
          Crear Arma
        </button>
      </form>
    </Flex>
  );
}

export default WeaponPost;
