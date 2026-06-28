import React, { useState } from "react"
import { getPasswordError } from "../utils/validators";

//componente interno
function PasswordInput({ value, onChange, placeholder = "Senha", onBlur }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
      <div style={{ display: "flex", alignItems: "center" }} className="input-group">
        <input
          type={showPassword ? "text" : "password"} //se showPassword for True mostra a senha escrita 
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="form-control"
          onBlur={onBlur}
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

//lift state da função, assim podemos controlar através do Login ou qualquer outra página
export default function InputSenha({ value, onChange, validate = false}) {
  const [touched, setTouched] = useState(false);
  const error = validate && touched ? getPasswordError(value) : null; //só realiza a validação caso seja True!

  return (
    <div>
      <PasswordInput
          value={value}
          onChange={onChange}
          onBlur={() => setTouched(true)}
      />
      {error && <span className="error">{error}</span>}
    </div>
  );
}