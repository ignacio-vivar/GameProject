import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { characterForm, characterSchema } from "../schemas/character";
import usePostChar from "../hooks/usePostChar";
import { Flex } from "@chakra-ui/react";

function DashboardPost({ onPostSuccess }: { onPostSuccess: () => void }) {
  const { handlePostRequest } = usePostChar();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<characterForm>({ resolver: zodResolver(characterSchema) });

  const onSubmit = async (data: characterForm) => {
    // console.log(data);
    await handlePostRequest(data);
    onPostSuccess();
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
            type="character"
            className="form-control"
            id="name"
          />
          {errors?.name?.message ?? <p>{errors?.name?.message}</p>}
        </div>
        <div className="mb-3">
          <label htmlFor="defense" className="form-label">
            Defense
          </label>
          <input
            {...register("defense")}
            type="number"
            className="form-control"
            id="defense"
          />
          {errors?.defense?.message ?? <p>{errors?.defense?.message}</p>}
        </div>

        <div className="mb-3">
          <label htmlFor="autoHealth" className="form-label">
            AutoHealth
          </label>
          <input
            {...register("autohealth")}
            type="character"
            className="form-control"
            id="autohealth"
          />
          {errors?.autohealth?.message ?? <p>{errors?.autohealth?.message}</p>}
        </div>

        <div className="mb-3">
          <label htmlFor="weapon_name" className="form-label">
            Weapon_Name
          </label>
          <input
            {...register("weapon_name")}
            type="character"
            className="form-control"
            id="weapon_name"
          />
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

export default DashboardPost;
