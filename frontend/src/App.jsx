import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
{/* routes, Route, useNavigate, Navigate só funcionam se estiverem dentro de um BrowserRouter */}
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import PrivateRoute from "./components/PrivateRoute";

export default function App() {
  return (
    <BrowserRouter> 
      <Routes>
        <Route path="/" element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        } />
        <Route path="/login" element={< Login />} />
      </Routes>
    </BrowserRouter>
  )
}