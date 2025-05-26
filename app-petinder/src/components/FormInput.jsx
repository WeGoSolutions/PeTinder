import React, { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react"; 
// import TextField from '@mui/material/TextField';
import "./components.css";

function FormInput(props) {
    const [showPassword, setShowPassword] = useState(false);

    const inputType = props.type === "password" ? (showPassword ? "text" : "password") : props.type;

    return (
        <div className="input-container" style={{ position: "relative" }}>
            <input
                type={inputType}
                id={props.id}
                name={props.name}
                placeholder=" "
                required={props.required}
                defaultValue={props.value}
                onChange={props.onChange}
                disabled={props.disabled}
            />
            <label htmlFor={props.name}>{props.label}</label>
            {props.error && <span className="error-message">{props.error}</span>}

            {/* botão de olho só se for senha */}
            {props.type === "password" && (
                <button 
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    style={{
                        position: "absolute",
                        top: "50%",
                        right: "10px",
                        transform: "translateY(-50%)",
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
                        padding: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
            )}
        </div>
    );
}

export default FormInput;
