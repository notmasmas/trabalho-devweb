import React, { useState } from "react"

export default function Input({ type = "text", placeholder = "", value, onChange }) {
    return (
        <div>
            <input
                type={type}
                className="form-control"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </div>
    );
}