import React, { useState } from "react"
import logo from '../assets/img/logo.svg'
import { Button, InputSenha, Input, Card } from '../components'

function handleSubmit() {
    //implementar validação com api (backend)
}

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

  return (
    <div className="right-panel">
      <h2>Faça seu login</h2>
      <p className="subtitle">
        Acesse o Acervo Design e facilite a sua vida
        acadêmica!
      </p>
      
      <Input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
      <InputSenha />

      <Button onClick={handleSubmit}> Entrar </Button>

      <div className="divider">  
        <p className="sign-in-text">
          Ou <a href="#"> crie sua conta </a>
        </p>
      </div>
    </div>
  );
}

export default function Login({ onLogin }) {
  return (
    <div className="main-wrapper">
      <Card>
      <LeftPanel />
      <RightPanel onLogin={onLogin}/>
      </Card>
    </div>
  );
}