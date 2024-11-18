import axios from "axios";
export default function useDeleteAll() {
  const tokenData = localStorage.getItem("token");

  const handleDelete = async () => {
    if (tokenData) {
      const token = JSON.parse(tokenData);
      const accessToken = token.access_token;

      if (accessToken) {
        try {
          await axios.delete("http://127.0.0.1:8000/api/characters/deleteAll", {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          });
          // console.log(response);
          window.location.reload();
        } catch (error: any) {
          console.error("Error", error);
        }
      }
    }
  };
  return { handleDelete };
}
