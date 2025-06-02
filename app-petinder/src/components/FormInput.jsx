import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import "./components.css";

function FormInput(props) {
    const [showPassword, setShowPassword] = useState(false);

    const inputType = props.type === "password" ? (showPassword ? "text" : "password") : props.type;
    const hasError = !!props.error;

    // Máscara de CPF
    const maskCPF = (value) => {
        return value
            .replace(/\D/g, "")
            .slice(0, 11)
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    };

    const maskCEP = (value) => {
        return value
            .replace(/\D/g, "")
            .slice(0, 8)
            .replace(/(\d{5})(\d{1,3})$/, "$1-$2");
    };

    const handleChange = (e) => {
        let value = e.target.value;

        if (props.name === "cpf" || props.id === "cpf") {
            value = maskCPF(value);
        }

        if (props.name === "cep" || props.id === "cep") {
            value = maskCEP(value);
        }

        if (props.onChange) {
            // Repassa o evento com os campos corretos
            props.onChange({
                target: {
                    name: props.name,
                    value: value,
                }
            });
        }
    };

    return (
        <div className="input-container" style={{ position: "relative" }}>
            <input
                type={inputType}
                id={props.id}
                name={props.name}
                placeholder=" "
                required={props.required}
                value={props.value || ""}
                onChange={handleChange}
                disabled={props.disabled}
            />
            <label htmlFor={props.name}>{props.label}</label>
            {hasError && <span className="error-message">{props.error}</span>}

            {props.type === "password" && (
                <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    style={{
                        position: "absolute",
                        top: hasError ? "38%" : "50%",
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
