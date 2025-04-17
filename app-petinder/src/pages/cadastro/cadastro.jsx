import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormInput from "../../components/FormInput";
import PrimaryButton from "../../components/PrimaryButton";
import styles from './cadastro.module.css';
import axios from "axios";
import { url } from "../../provider/apiInstance";

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
        } else {
            resetInputStyle("nome");
        }

        if (!formValues.email.trim()) {
            newErrors.email = "O email é obrigatório.";
            setErrorStyle("email");
        } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
            newErrors.email = "Email inválido. Verifique o formato.";
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
            resetInputStyle("dataNasc");
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

    const handleConfirmSubmit = async (e) => {
        e.preventDefault();


        if (!isChecked) {
            alert("Você precisa aceitar os Termos de condição.");
            return;
        }

        // const userData = {
        //     nome: formValues.nome,
        //     email: formValues.email,
        //     senha: formValues.senha,
        //     dataNasc: formValues.dataNasc,
        //     cpf: null,
        //     cep: null,
        //     rua: null,
        //     numero: null,
        //     cidade: null,
        //     uf: null,
        // };

        try {
            url.post("/users", {
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
            })

            // const response = await fetch("http://localhost:8080/users", {
            //     method: "POST",
            //     headers: {
            //         "Content-Type": "application/json",
            //     },
            //     body: JSON.stringify(userData),
            // });

            // if (!response.ok) {
            //     // const errorMessage = await response.text();
            //     throw new Error(`Erro ao criar conta: ${errorMessage}`);
            // }

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
            console.error("Erro:", error);
            alert(error.message);
        }
    };

    return (
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
    );
}

export default Cadastro;