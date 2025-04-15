import { useState } from "react";
import "./components.css";
import FormInput from "./FormInput";
import SecondaryButton from "./SecondaryButton";
import axios from "axios";

export default function NewPassword(props) {
    if (!props.passwordOpen) return null;

    const [formNewValues, setFormNewValues] = useState({ novaSenha: "", confirmarSenha: "" });
    const [errors, setErrors] = useState({});

    const validatePasswords = () => {
        let newErrors = {};

        if (!formNewValues.novaSenha.trim()) {
            newErrors.novaSenha = "A nova senha é obrigatória.";
            setErrorStyle("novaSenha");
        } else {
            resetInputStyle("novaSenha");
        }

        if (!formNewValues.confirmarSenha.trim()) {
            newErrors.confirmarSenha = "A confirmação de senha é obrigatória.";
            setErrorStyle("confirmarSenha");
        } else {
            resetInputStyle("confirmarSenha");
        }

        if (
            formNewValues.novaSenha.trim() &&
            formNewValues.confirmarSenha.trim() &&
            formNewValues.novaSenha !== formNewValues.confirmarSenha
        ) {
            newErrors.confirmarSenha = "As senhas devem coincidir.";
            setErrorStyle("novaSenha");
            setErrorStyle("confirmarSenha");
        } else if (
            formNewValues.novaSenha.trim() &&
            formNewValues.confirmarSenha.trim()
        ) {
            resetInputStyle("novaSenha");
            resetInputStyle("confirmarSenha");
        }
        

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const setErrorStyle = (id) => {
        const inputElement = document.getElementById(id);
        if (inputElement) {
            inputElement.style.border = "2px solid red";
            inputElement.closest(".input-container")?.classList.add("error");
        }
    };

    const resetInputStyle = (id) => {
        const inputElement = document.getElementById(id);
        if (inputElement) {
            inputElement.style.border = "2px solid black";
            inputElement.closest(".input-container")?.classList.remove("error");
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormNewValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));

        if (errors[name]) {
            resetInputStyle(name);
            setErrors((prevErrors) => {
                const updatedErrors = { ...prevErrors };
                delete updatedErrors[name];
                return updatedErrors;
            });
        }
    };

    const changePassword = () => {
        if (!validatePasswords()) return;

        alert("Finalizado com sucesso! Chamar o axios/backend");

        // axios
        //     .patch("http://localhost:8080/users?", {
        //         novaSenha: formNewValues.novaSenha,
        //         confirmarSenha: formNewValues.confirmarSenha,
        //     })
        //     .then(() => {
        //         props.onCloseAll();
        //     })
        //     .catch((error) => {
        //         console.error("Erro ao atualizar a senha:", error);
        //     });
    }

    return (
        <div>
            <div className="modalPassword" onClick={(e) => e.stopPropagation()}>
                <div className="closeButtonModal" onClick={props.onCloseAll}>
                    <img src="./assets/closeButton.png" />
                </div>

                <div className="modalContent">
                    <h1>Redefinição de senha</h1>
                    <FormInput
                        id="novaSenha"
                        name="novaSenha"
                        label="Nova senha"
                        type="password"
                        required
                        value={formNewValues.novaSenha}
                        onChange={handleInputChange}
                        error={errors.novaSenha}
                    />
                    <FormInput
                        id="confirmarSenha"
                        name="confirmarSenha"
                        label="Confirmar senha"
                        type="password"
                        required
                        value={formNewValues.confirmarSenha}
                        onChange={handleInputChange}
                        error={errors.confirmarSenha}
                    />
                    <div onClick={changePassword}>
                        <SecondaryButton type="button" text="Enviar" />
                    </div>
                </div>
            </div>
        </div>
    );
}