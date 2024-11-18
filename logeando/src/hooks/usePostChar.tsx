import axios from "axios";
import { useState } from "react";

type Character = {
  name: string;
  defense: string;
  autohealth: string;
  weapon_name: string;
};

type PostCharResponse = {
  data: string | null;
  error: string | null;
  isLoading: boolean;
  handlePostRequest: (char: Character) => void;
};

export default function usePostChar(): PostCharResponse {
  const [data, setData] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handlePostRequest = async (char: Character) => {
    setIsLoading(true);
    const tokenData = localStorage.getItem("token");
    if (tokenData) {
      const token = JSON.parse(tokenData);
      const accessToken = token.access_token;

      if (accessToken) {
        try {
          const response = await axios.post(
            "http://127.0.0.1:8000/api/characters/",
            char,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
              },
            }
          );
          if (response.data) {
            setData(response.data);
            // window.location.reload();
          }
        } catch (error: any) {
          console.error("Error", error);
          setError(error);
        }
      }
    }
  };
  return { data, error, isLoading, handlePostRequest };
}
