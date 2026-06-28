import React, { useState } from "react"
import { getPasswordError } from "../utils/validators";

export default function InputSenha({ value, onChange, validate = false, placeholder = "Senha", onBlur }) {
  const [showPassword, setShowPassword] = useState(false);
  const [touched, setTouched] = useState(false);
  const error = validate && touched ? getPasswordError(value) : null; //só realiza a validação caso seja True!
  //getPasswordError é uma função do validators

  function handleBlur() {
    setTouched(true);
    onBlur?.(); //"chame essa função, mas só se ela existir"
  }

  return (
      <div>
        <div style={{ display: "flex", alignItems: "center" }} className="input-group">
          <input
            type={showPassword ? "text" : "password"} //se showPassword for True mostra a senha escrita 
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="form-control"
            onBlur={handleBlur}
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
        {error && <span className="error">{error}</span>}
      </div>
  );
}