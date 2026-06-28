import React, { useState } from "react"
import { getEmailError } from "../utils/validators";

export default function Input({ type = "text", placeholder = "", value, onChange, validate = false }) {
    const error = validate && type === "email" ? getEmailError(value) : null;
    
    return (
        <div>
            <input
                type={type}
                className="form-control"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
            {error && <span className="error">{error}</span>}
        </div>
    );
}