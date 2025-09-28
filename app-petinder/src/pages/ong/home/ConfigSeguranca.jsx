import { useNavigate } from "react-router-dom";
import "../../../components/components.css";
import FormInput from "../../../components/FormInput";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { useState } from "react";
import axios from "axios";
import { url } from "../../../provider/apiInstance";
import reqs from "../../../reqs";
import Toast from "../../../components/Toast";
import PrimaryButton from "../../../components/PrimaryButton";
import Strings from "../../../utils/strings"

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
            newErrors.novaSenha = Strings.erroSenha1;
            setErrorStyle("novaSenha");
        } else if (!tamanhoValido) {
            newErrors.novaSenha = Strings.erroSenha2;
            setErrorStyle("novaSenha");
        } else if (!temLetraMaiuscula) {
            newErrors.novaSenha = Strings.erroSenha3;
            setErrorStyle("novaSenha");
        } else if (!temLetraMinuscula) {
            newErrors.novaSenha = Strings.erroSenha4;
            setErrorStyle("novaSenha");
        } else if (!temSimbolo) {
            newErrors.novaSenha = Strings.erroSenha5;
            setErrorStyle("novaSenha");
        } else {
            resetInputStyle("novaSenha");
        }

        if (!confirmar.trim()) {
            newErrors.confirmarSenha = Strings.erroConfSenha;
            setErrorStyle("confirmarSenha");
        } else if (senha && confirmar && senha !== confirmar) {
            newErrors.confirmarSenha = Strings.erroSenha6;
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
            setErrors(prev => ({
                ...prev,
                confirmarSenha: Strings.erroSenha6
            }));
            setErrorStyle("novaSenha");
            setErrorStyle("confirmarSenha");
            return;
        }

        const result = await reqs.AtualizarSenhaOngConfig(
            ongId, 
            formValues.senhaAtual, 
            formValues.novaSenha
        );

        if (result.success) {
            setToast({ mensagem: 'Senha atualizada com sucesso!', tipo: 'sucesso' });
            setFormValues({
                senhaAtual: "",
                novaSenha: "",
                confirmarSenha: ""
            });

            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } else {
            console.error("Erro ao atualizar a senha:", result.error);

            let newErrors = {};
            if (result.errorType === "wrongCurrentPassword") {
                newErrors.senhaAtual = Strings.erroSenha9;
                setErrorStyle("senhaAtual");
            }

            setErrors(prev => ({
                ...prev,
                ...newErrors
            }));
        }
    };

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
                        label={Strings.senhaAtual}
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
                        label={Strings.novaSenha}
                        type="password"
                        required
                        value={formValues.novaSenha}
                        onChange={handleChange}
                        error={errors.novaSenha}
                    />

                    <FormInput
                        id="confirmarSenha"
                        name="confirmarSenha"
                        label={Strings.confNovaSenha}
                        type="password"
                        required
                        value={formValues.confirmarSenha}
                        onChange={handleChange}
                        error={errors.confirmarSenha}
                    />
                </div>

                <div className="buttonsAct">
                    <div onClick={changePassword}>
                        <PrimaryButton type="button" text="Salvar" />
                    </div>
                </div>
            </div>
        </>
    );
}