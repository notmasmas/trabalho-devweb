import React, { useState } from "react"
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import logo from '../assets/img/logo.svg'
import { Button, InputSenha, Input, Card } from '../components'

function LeftPanel() {
  return (
    <div className="left-panel">
      <div className="illustration-box">
        <img src={logo} alt="Logo Acervo Design" className="logo" />
      </div>
      <h3 className="panel-title">Acervo Design</h3>
      <p className="panel-desc">
        Plataforma digital exclusiva para alunos do curso de Design, com o
        objetivo de centralizar materiais acadêmicos, facilitar o acesso ao
        conhecimento e melhorar a troca de informações entre estudantes de
        diferentes semestres.
      </p>
    </div>
  );
}

function RightPanel() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit() {
    try {
      await api.post("/auth/login", { email, password });
      navigate("/home"); //redireciona
    } catch (err) {
      setError("E-mail ou senha inválidos.");
    }
  }

  return (
    <div className="right-panel">
      <h2>Faça seu login</h2>
      <p className="subtitle">
        Acesse o Acervo Design e facilite a sua vida
        acadêmica!
      </p>
      
      <Input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} validate />
      <InputSenha value={password} onChange={(e) => setPassword(e.target.value)} />
      <a className="recovery-link mt-1"> Esqueci a minha senha </a>

      <Button onClick={handleSubmit}> Entrar </Button>

      <div className="divider">  
        <p className="sign-in-text">
          Ou <a href="#"> crie sua conta </a>
        </p>
      </div>
    </div>
  );
}

export default function Login() {
  return (
    <div className="main-wrapper">
      <Card>
      <LeftPanel />
      <RightPanel />
      </Card>
    </div>
  );
}