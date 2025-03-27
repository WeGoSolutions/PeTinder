import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormInput from "../../components/FormInput";
import PrimaryButton from "../../components/PrimaryButton";
import styles from './cadastro.module.css';

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
        // console.log(`Campo alterado: ${name}, Valor: ${value}`); // Adicione este log
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleConfirmSubmit = async (e) => {
        e.preventDefault();

        if (!isChecked) {
            alert("Você precisa aceitar os Termos de condição.");
            return;
        }

        const userData = {
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
        };

        try {
            const response = await fetch("http://localhost:8080/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(`Erro ao criar conta: ${errorMessage}`);
            }

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
                            X
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
                                />
                                <FormInput
                                    id="email"
                                    name="email"
                                    label="Email"
                                    type="email"
                                    required
                                    value={formValues.email}
                                    onChange={handleInputChange}
                                />
                                <FormInput
                                    id="senha"
                                    name="senha"
                                    label="Senha"
                                    type="password"
                                    required
                                    value={formValues.senha}
                                    onChange={handleInputChange}
                                />
                                <FormInput
                                    id="confSenha"
                                    name="confSenha"
                                    label="Confirmar Senha"
                                    type="password"
                                    required
                                    value={formValues.confSenha}
                                    onChange={handleInputChange}
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
                        <div className={styles.registerButtonWrapper}>
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