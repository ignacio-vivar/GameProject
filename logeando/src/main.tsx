import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";

createRoot(document.getElementById("root")!).render(
  <ChakraProvider value={defaultSystem}>
    <StrictMode>
      <App />
    </StrictMode>
  </ChakraProvider>
);
