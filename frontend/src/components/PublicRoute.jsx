import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import api from "../api/axios";
import Loading from "./Loading.jsx";

export default function PublicRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
    useEffect(() => {
    const minDelay = new Promise(resolve => setTimeout(resolve, 800));

    const verify = api.get("/auth/verify", { withCredentials: true })
      .then(() => setIsAuth(true))
      .catch(() => setIsAuth(false));

    Promise.all([verify, minDelay]).finally(() => setLoading(false));
    }, []);

    if (loading) return < Loading / >;

    if (isAuth) {
      return <Navigate to="/" replace />;
    }

    return children;
}