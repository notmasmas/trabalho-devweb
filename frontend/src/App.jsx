import React, { useState } from "react";
import Login from "./Components/Login/login.js";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  //return <Home />; //placeholder
}