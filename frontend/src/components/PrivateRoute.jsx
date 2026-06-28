import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import api from "../api/axios";

export default function PrivateRoute({ children }) {
  const [autenticado, setAutenticado] = useState(null);

  useEffect(() => {
    api.get("/me")
      .then(() => setAutenticado(true))
      .catch(() => setAutenticado(false));
  }, []);

  if (autenticado === null) return <span>Carregando...</span>;
  return autenticado ? children : <Navigate to="/" />;
}