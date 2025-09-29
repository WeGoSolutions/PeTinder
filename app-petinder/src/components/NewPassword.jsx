import { useState } from "react";
import "./components.css";
import FormInput from "./FormInput";
import SecondaryButton from "./SecondaryButton";
import Toast from "../components/Toast";
import reqs from "../reqs";

export default function NewPassword(props) {
    if (!props.passwordOpen) return null;

    const [formNewValues, setFormNewValues] = useState({ novaSenha: "", confirmarSenha: "" });
    const [errors, setErrors] = useState({});
    const [toast, setToast] = useState({ mensagem: '', tipo: 'sucesso' });

    const validatePasswords = () => {
        let newErrors = {};
        const senha = formNewValues.novaSenha;
        const confirmar = formNewValues.confirmarSenha;

        const temLetraMaiuscula = /[A-Z]/.test(senha);
        const temLetraMinuscula = /[a-z]/.test(senha);
        const temSimbolo = /[^A-Za-z0-9]/.test(senha);
        const tamanhoValido = senha.length >= 8;

        if (!senha.trim()) {
            newErrors.novaSenha = "A nova senha é obrigatória.";
            setErrorStyle("novaSenha");
        } else if (!tamanhoValido) {
            newErrors.novaSenha = "A senha deve ter pelo menos 8 caracteres.";
            setErrorStyle("novaSenha");
        } else if (!temLetraMaiuscula) {
            newErrors.novaSenha = "A senha deve conter pelo menos uma letra maiúscula.";
            setErrorStyle("novaSenha");
        } else if (!temLetraMinuscula) {
            newErrors.novaSenha = "A senha deve conter pelo menos uma letra minúscula.";
            setErrorStyle("novaSenha");
        } else if (!temSimbolo) {
            newErrors.novaSenha = "A senha deve conter pelo menos um símbolo.";
            setErrorStyle("novaSenha");
        } else {
            resetInputStyle("novaSenha");
        }

        if (!confirmar.trim()) {
            newErrors.confirmarSenha = "A confirmação de senha é obrigatória.";
            setErrorStyle("confirmarSenha");
        } else if (senha && confirmar && senha !== confirmar) {
            newErrors.confirmarSenha = "As senhas devem coincidir.";
            setErrorStyle("novaSenha");
            setErrorStyle("confirmarSenha");
        } else {
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

    const changePassword = async () => {
        if (!validatePasswords()) return;

        const result = await reqs.changePassword(formNewValues.novaSenha, props.emailReset);
        
        if (result.success) {
            setToast({ mensagem: result.message, tipo: 'sucesso' });

            setTimeout(() => {
                props.onCloseAll();
            }, 2000);
        } else {
            setToast({ mensagem: result.message, tipo: 'erro' });
        }
    };

    return (
        <div>
            <div className="toastContainer">
                {toast.mensagem && (
                    <Toast
                        mensagem={toast.mensagem}
                        tipo={toast.tipo}
                        onClose={() => setToast({ mensagem: '', tipo: 'sucesso' })}
                    />
                )}
            </div>

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