import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type Usuario = {
  username: string;
  password: string;
};

type UseLoginResponse = {
  // data: string | null;
  error: string | null;
  isLoading: boolean;
  handlePostRequest: (user: Usuario) => void;
};

export default function useLogin(): UseLoginResponse {
  const navigate = useNavigate();
  // const [data, setData] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handlePostRequest = async (user: Usuario) => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      //   params.append("grant_type", "password");
      params.append("username", user.username);
      params.append("password", user.password);
      //   params.append("scope", ""); // Si es necesario
      //   params.append("client_id", "string"); // Sustituir por el valor real
      //   params.append("client_secret", "string"); // Sustituir por el valor real

      const response = await axios.post(
        "http://127.0.0.1:8000/api/login",
        params,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      // console.log(response.data);
      localStorage.setItem("token", JSON.stringify(response.data));
      // setData(response.data);
      navigate("/dashboard");
    } catch (error: any) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
      setError(error);
      navigate("/");
    } finally {
      setIsLoading(false);
    }
  };

  // return { data, error, isLoading, handlePostRequest };
  return { error, isLoading, handlePostRequest };
}
