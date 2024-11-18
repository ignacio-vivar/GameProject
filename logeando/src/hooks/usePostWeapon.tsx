import axios from "axios";
import { useState } from "react";

type Weapon = {
  name: string;
  damage: string;
};

export default function usePostWeapon() {
  const [data, setData] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handlePostRequest = async (weapon: Weapon) => {
    const tokenData = localStorage.getItem("token");
    if (tokenData) {
      const token = JSON.parse(tokenData);
      const accessToken = token.access_token;

      if (accessToken) {
        try {
          const response = await axios.post(
            "http://127.0.0.1:8000/api/weapons/",
            weapon,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
              },
            }
          );
          if (response.data) {
            setData(response.data);
            window.location.reload();
          }
        } catch (error: any) {
          console.error("Error", error);
          setError(error);
        }
      }
    }
  };
  return { data, error, handlePostRequest };
}
