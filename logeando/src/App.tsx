import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Character from "./pages/Character";
import ProtectedRoute from "./components/ProtectedRoute";
import Weapon from "./pages/Weapon";

function App() {
  const user = localStorage.getItem("user");
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/character/:id" element={<Character />} />

        {/* Ruta protegida para Weapon */}
        <Route
          path="/weapon"
          element={
            <ProtectedRoute
              isAllowed={user === "adminChar"}
              redirectPath="/dashboard"
            >
              <Weapon />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
