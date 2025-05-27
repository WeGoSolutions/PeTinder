import { useNavigate } from "react-router-dom";
import "../../../components/components.css";
import FormInput from "../../../components/FormInput";
import SecondaryButton from "../../../components/SecondaryButton";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { useState } from "react";
import axios from "axios";
import Toast from "../../../components/Toast";

export default function ConfigSeguranca() {
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [toast, setToast] = useState({ mensagem: '', tipo: 'sucesso' });


    const [formValues, setFormValues] = useState({
        senhaAtual: "",
        novaSenha: "",
        confirmarSenha: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues(prev => ({
            ...prev,
            [name]: value
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

    /* mexendo */
    const validatePasswords = () => {
        let newErrors = {};
        const senha = formValues.novaSenha;
        const confirmar = formValues.confirmarSenha;

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

    const changePassword = async () => {
        if (!validatePasswords()) return;

        const ongId = sessionStorage.getItem("ongId");
        if (!ongId) return;

        if (formValues.novaSenha !== formValues.confirmarSenha) {
            alert("A nova senha e a confirmação não coincidem.");
            return;
        }

        try {
            await axios.patch(`http://localhost:8080/ongs/${ongId}/senha`, {
                senhaAtual: formValues.senhaAtual,
                novaSenha: formValues.novaSenha
            })
                .then(() => {
                    setFormValues({
                        senhaAtual: "",
                        novaSenha: "",
                        confirmarSenha: ""
                    })
                })

            setToast({ mensagem: 'Senha atualizada com sucesso!', tipo: 'sucesso' });

            setTimeout(() => {
                navigate('/login');
            }, 2000);

        } catch (error) {
            console.error("Erro ao atualizar a senha:", error);
            const newErrors = {};

            if (error.response && error.response.status === 409) {
                newErrors.senhaAtual = "Senha atual incorreta.";
                setErrorStyle("senhaAtual");
                // setToast({ mensagem: 'Erro ao atualizar a senha. Tente novamente.', tipo: 'erro' }); /* remover o toast ou o errorStyle */
            }

            setErrors(prev => ({
                ...prev,
                ...newErrors
            }));
        }
    };

    /* mexendo */

    return (
        <>
            <div className="segurancaContainer">
                <div className="toastContainer">
                    {toast.mensagem && (
                        <Toast
                            mensagem={toast.mensagem}
                            tipo={toast.tipo}
                            onClose={() => setToast({ mensagem: '', tipo: 'sucesso' })}
                        />
                    )}
                </div>
                <div className="segurancaTitle">
                    <h1>Segurança</h1>
                    <h2>Mudança de senha</h2>
                </div>

                <div className="senhaAtual">
                    <FormInput
                        id="senhaAtual"
                        name="senhaAtual"
                        label="Senha atual"
                        type="password"
                        required
                        value={formValues.senhaAtual}
                        onChange={handleChange}
                        error={errors.senhaAtual}
                    />
                    <h3>
                        <IoMdInformationCircleOutline size={14} /> Esqueceu sua senha atual? Faça o processo de “Esqueci a senha” na tela de Login.
                    </h3>
                </div>

                <div className="inputSenhas">
                    <FormInput
                        id="novaSenha"
                        name="novaSenha"
                        label="Nova senha"
                        type="password"
                        required
                        value={formValues.novaSenha}
                        onChange={handleChange}
                        error={errors.novaSenha}
                    />

                    <FormInput
                        id="confirmarSenha"
                        name="confirmarSenha"
                        label="Confirmar senha"
                        type="password"
                        required
                        value={formValues.confirmarSenha}
                        onChange={handleChange}
                        error={errors.confirmarSenha}
                    />
                </div>

                <div className="buttonsAct">
                    <div onClick={changePassword}>
                        <SecondaryButton type="button" text="Salvar" />
                    </div>
                </div>
            </div>
        </>
    );
}