import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import api from "../api/axios";
import { Loading } from "./index";

export default function PublicRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    api.get("/auth/verify", { withCredentials: true })
      .then(() => setIsAuth(true))
      .catch(() => setIsAuth(false))
      .finally(() => setLoading(false));
  }, []);

    if (loading) return <Loading />;

    if (isAuth) {
      return <Navigate to="/" replace />;
    }

    return children;
}