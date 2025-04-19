import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormInput from "../../components/FormInput";
import PrimaryButton from "../../components/PrimaryButton";
import styles from './cadastro.module.css';
import { url } from "../../provider/apiInstance";
import Toast from "../../components/Toast";


function Cadastro() {
    const Navigate = useNavigate();

    const [formValues, setFormValues] = useState({
        nome: "",
        email: "",
        senha: "",
        confSenha: "",
        dataNasc: "",
    });

    const [isChecked, setIsChecked] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));

        if (errors[name]) {
            const inputElement = document.getElementById(name);
            if (inputElement) {
                inputElement.style.border = "2px solid black"; // Volta ao normal
                inputElement.closest(".input-container")?.classList.remove("error");
            }

            setErrors((prevErrors) => {
                const updatedErrors = { ...prevErrors };
                delete updatedErrors[name];
                return updatedErrors;
            });
        }
    };

    const [errors, setErrors] = useState({});

    const validateForm = () => {
        let newErrors = {};

        const resetInputStyle = (id) => {
            const inputElement = document.getElementById(id);
            if (inputElement) {
                inputElement.style.border = "2px solid black";
                inputElement.closest(".input-container").classList.remove("error");
            }
        };

        const setErrorStyle = (id) => {
            const inputElement = document.getElementById(id);
            if (inputElement) {
                inputElement.style.border = "2px solid red";
                inputElement.closest(".input-container").classList.add("error");
            }
        };

        if (!formValues.nome.trim()) {
            newErrors.nome = "O nome é obrigatório.";
            setErrorStyle("nome");
        } else if (formValues.nome.trim().length < 3) {
            newErrors.nome = "O nome deve ter pelo menos 3 caracteres.";
            setErrorStyle("nome");
        } else {
            resetInputStyle("nome");
        }

        if (!formValues.email.trim()) {
            newErrors.email = "O email é obrigatório.";
            setErrorStyle("email");
        } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
            newErrors.email = "Email inválido. Deve possuir @ e domínio.";
            setErrorStyle("email");
        } else {
            resetInputStyle("email");
        }

        if (!formValues.senha.trim()) {
            newErrors.senha = "A senha é obrigatória.";
            setErrorStyle("senha");
        } else if (formValues.senha.length < 8) {
            newErrors.senha = "A senha deve ter pelo menos 8 caracteres.";
            setErrorStyle("senha");
        } else {
            resetInputStyle("senha");
        }

        if (formValues.confSenha !== formValues.senha) {
            newErrors.confSenha = "As senhas não coincidem.";
            setErrorStyle("confSenha");
        } else {
            resetInputStyle("confSenha");
        }

        if (!formValues.dataNasc) {
            newErrors.dataNasc = "A data de nascimento é obrigatória.";
            setErrorStyle("dataNasc");
        } else {
            const birthDate = new Date(formValues.dataNasc);
            const today = new Date();
            const age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();
            const dayDiff = today.getDate() - birthDate.getDate();
            const adjustedAge = monthDiff > 0 || (monthDiff === 0 && dayDiff >= 0) ? age : age - 1;

            if (adjustedAge < 21) {
                newErrors.dataNasc = "Você deve ter pelo menos 21 anos.";
                setErrorStyle("dataNasc");
            } else {
                resetInputStyle("dataNasc");
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; 
    };

    const [toast, setToast] = useState({ mensagem: '', tipo: 'sucesso' });

    const handleConfirmSubmit = async (e) => {
        e.preventDefault();

        const isValid = validateForm();

        if (!isValid) {
            return; 
        }

        if (!isChecked) {
            alert("Você precisa aceitar os Termos de condição.");
            return;
        }

        try {
            await url.post("/users", {
                nome: formValues.nome,
                email: formValues.email,
                senha: formValues.senha,
                dataNasc: formValues.dataNasc,
                cpf: null,
                cep: null,
                rua: null,
                numero: null,
                cidade: null,
                uf: null,
            });

            alert("Conta criada com sucesso!");

            setFormValues({
                nome: "",
                email: "",
                senha: "",
                confSenha: "",
                dataNasc: "",
            });
            setIsChecked(false);

            Navigate("/login");
        } catch (error) {
            if (error.response && error.response.status === 409) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    email: "Este e-mail já está cadastrado.",
                }));
                const inputElement = document.getElementById("email");
                if (inputElement) {
                    inputElement.style.border = "2px solid red";
                    inputElement.closest(".input-container").classList.add("error");
                }
            } else {
                console.error("Erro:", error);
                setToast({
                    mensagem: "Erro inesperado ao criar conta. Tente novamente mais tarde.",
                    tipo: "erro"
                });
            }
        }

    };


    return (
        <>
            <div className="toastContainer">
                {toast.mensagem && (
                    <Toast
                        mensagem={toast.mensagem}
                        tipo={toast.tipo}
                        onClose={() => setToast({ mensagem: '', tipo: 'sucesso' })}
                    />
                )}
            </div>

            <div className={styles.container}>
                <div className={styles.backgroundImage}>
                    <div className={styles.registerContainer}>
                        <div className={styles.closeButtonWrapper}>
                            <div className={styles.closeButton} onClick={() => Navigate("/")}>
                                <img src="./assets/closeButton.png" alt="" />
                            </div>
                        </div>
                        <form className={styles.registerForm} onSubmit={handleConfirmSubmit}>
                            <div className={styles.titleWrapper}>
                                <img src="./Logo.svg" alt="" />
                                <h1 className={styles.registerTitle}>PeTinder</h1>
                            </div>
                            <div className={styles.containerGap}>
                                <div className={styles.registerFormWrapper}>
                                    <FormInput
                                        id="nome"
                                        name="nome"
                                        label="Nome Completo"
                                        type="text"
                                        required
                                        value={formValues.nome}
                                        onChange={handleInputChange}
                                        error={errors.nome}
                                    />
                                    <FormInput
                                        id="email"
                                        name="email"
                                        label="Email"
                                        type="email"
                                        required
                                        value={formValues.email}
                                        onChange={handleInputChange}
                                        error={errors.email}
                                    />
                                    <FormInput
                                        id="senha"
                                        name="senha"
                                        label="Senha"
                                        type="password"
                                        required
                                        value={formValues.senha}
                                        onChange={handleInputChange}
                                        error={errors.senha}
                                    />
                                    <FormInput
                                        id="confSenha"
                                        name="confSenha"
                                        label="Confirmar Senha"
                                        type="password"
                                        required
                                        value={formValues.confSenha}
                                        onChange={handleInputChange}
                                        error={errors.confSenha}
                                    />
                                    <div className={styles.registerFormRow}>
                                        <FormInput
                                            id="dataNasc"
                                            name="dataNasc"
                                            label="Data de Nascimento"
                                            type="date"
                                            required
                                            value={formValues.dataNasc}
                                            onChange={handleInputChange}
                                            error={errors.dataNasc}
                                        />
                                    </div>
                                </div>
                                <label className={styles.termsLabel}>
                                    <input
                                        type="checkbox"
                                        className={styles.hiddenCheckbox}
                                        id="termsCheckbox"
                                        checked={isChecked}
                                        onChange={(e) => setIsChecked(e.target.checked)}
                                    />
                                    <div className={styles.styledCheckbox}></div>
                                    Li e aceito os <a href="#" className={styles.termsLink}>Termos de condição</a>
                                </label>
                            </div>
                            <div onClick={validateForm} className={styles.registerButtonWrapper}>
                                <PrimaryButton type="submit" text="Criar conta" />
                            </div>
                            <div className={styles.registerLinkWrapper}>
                                <span>Já possui conta? Entrar no </span>
                                <a onClick={() => Navigate("/login")} className={styles.loginLink}>PeTinder</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Cadastro;