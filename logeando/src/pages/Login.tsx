import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import useLogin from "../hooks/useLogin";
import { userForm, userSchema } from "../schemas/user";
function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<userForm>({ resolver: zodResolver(userSchema) });

  const { handlePostRequest } = useLogin();

  const onSubmit = (data: userForm) => {
    // Llamamos al hook con los datos del formulario
    // console.log(data);
    localStorage.setItem("user", data.username);
    handlePostRequest(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            User
          </label>
          <input
            {...register("username")}
            type="user"
            className="form-control"
            id="username"
            aria-describedby="emailHelp"
          />
          {errors?.username?.message ?? <p>{errors?.username?.message}</p>}
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            {...register("password")}
            type="password"
            className="form-control"
            id="exampleInputPassword1"
          />
          {errors?.password?.message ?? <p>{errors?.password?.message}</p>}
        </div>

        <button type="submit" className="btn btn-primary">
          Logearse
        </button>
      </form>
    </>
  );
}

export default Login;
