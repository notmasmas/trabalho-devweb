import { BrowserRouter, Routes, Route } from "react-router-dom";
{/* routes, Route, useNavigate, Navigate só funcionam se estiverem dentro de um BrowserRouter */}
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Cadastro from "./pages/Cadastro.jsx";
import Biblioteca from "./pages/Biblioteca/Biblioteca.jsx"
import Forum from "./pages/Forum/Forum.jsx"
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";

export default function App() {
  return (
    <BrowserRouter> 
      <Routes>

        <Route path="/login" element={
          <PublicRoute>
            < Login />
          </PublicRoute>
        } />

        <Route path="/cadastro" element={
          <PublicRoute>
            <Cadastro />
          </PublicRoute>
        } />

        <Route path="/" element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        } />

        <Route path="/biblioteca" element= {
          <PrivateRoute>
            <Biblioteca />
          </PrivateRoute>
        }/>

        <Route path="/forum" element= {
          <PrivateRoute>
            <Forum />
          </PrivateRoute>
        }/>

      </Routes>
    </BrowserRouter>
  )
}