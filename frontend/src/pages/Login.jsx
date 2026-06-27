import React, { useState } from "react"
import logo from '../assets/img/logo.svg';

function handleSubmit() {
    //implementar validação com api (backend)
}

function PasswordInput({ value, onChange, placeholder = "Senha" }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
      <div style={{ display: "flex", alignItems: "center" }} className="input-group">
        <input
          type={showPassword ? "text" : "password"} //se showPassword for True mostra a senha escrita 
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="form-control"
        />
        <button
          type="button"
          className="btn-eye"
          onClick={() => setShowPassword((prev) => !prev)} //inverte o valor do booleano
          aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
        >
          <i className={showPassword ? "bi bi-eye" : "bi bi-eye-slash"} />
        </button>
      </div>
    );
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
  const [password, setPassword] = useState("");

  return (
    <div className="right-panel">
      <h2>Faça seu login</h2>
      <p className="subtitle">
        Acesse o Acervo Design e facilite a sua vida
        acadêmica!
      </p>
      
      <div>
        <input
          type="email"
          className="form-control"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div>
        <PasswordInput
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <a className="recovery-link mt-1"> Esqueci a minha senha </a>
      </div>

      <button className="btn btn-main w-100" onClick={handleSubmit}> Entrar </button>

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
      <div className="card-shell">
      <LeftPanel />
      <RightPanel onLogin={onLogin}/>
      </div>
    </div>
  );
}