import { BrowserRouter, Routes, Route } from "react-router-dom";
{/* routes, Route, useNavigate, Navigate só funcionam se estiverem dentro de um BrowserRouter */}
import Home from "./pages/Home/Home.jsx";
import Login from "./pages/Login/Login.jsx";
import Cadastro from "./pages/Cadastro.jsx";
import Biblioteca from "./pages/Biblioteca/Biblioteca.jsx"
import Forum from "./pages/Forum/Forum.jsx"
import PostPage from "./pages/Forum/PostPage.jsx"
import BibliotecaEditar from './pages/BibliotecaEditar/BibliotecaEditar.jsx'
import { PrivateRoute, PublicRoute } from "./components";
import Semestres from "./pages/Semestres/Semestres.jsx";
import Usuario from './pages/Usuario/Usuario.jsx';

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

        <Route path="/biblioteca/editar" element= {
          <PrivateRoute>
            <BibliotecaEditar />
          </PrivateRoute>
        }/>

        <Route path="/semestres" element={
          <PrivateRoute>
            <Semestres />
          </PrivateRoute>
        } />
          
        <Route path="/forum" element= {
          <PrivateRoute>
            <Forum />
          </PrivateRoute>
        }/>

        <Route path="/forum/:id" element={
          <PrivateRoute>
            <PostPage />
          </PrivateRoute>
        }/>

        <Route path="/usuario" element={
          <PrivateRoute>
            <Usuario />
          </PrivateRoute>
        }/>

      </Routes>
    </BrowserRouter>
  )
}