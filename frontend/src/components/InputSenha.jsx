import React, { useState } from "react"

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

export default function InputSenha() {
    const [password, setPassword] = useState("")

    return (
    <div>
    <PasswordInput
        value={password}
        onChange={(e) => setPassword(e.target.value)}
    />
    <a className="recovery-link mt-1"> Esqueci a minha senha </a>
    </div>
    );
}