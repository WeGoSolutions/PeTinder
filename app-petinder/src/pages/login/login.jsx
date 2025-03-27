import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormInput from "../../components/FormInput";
import PrimaryButton from "../../components/PrimaryButton";
import SecondaryButton from "../../components/SecondaryButton";
import styles from './login.module.css';

function Login() {

    const Navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { email, senha } = e.target.elements;
        if (!email.value || !senha.value) {
            alert("Por favor, preencha todos os campos.");
            return;
        }

        try {
            const response = await fetch(`http://localhost:8080/users?email${email.value}&senha=${senha.value}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) {
                throw new Error("Erro ao fazer login.");
            }

            const data = await response.json();
            console.log(data);

            if (data.length === 1) {
                console.log("Login realizado com sucesso!", data[0]);
                localStorage.setItem("userId", data[0].id);
                // Navigate("/home");
            } else {
                throw new Error("Usuário ou senha inválidos.");
            }
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.loginContainer}>
                <div className={styles.closeButtonWrapper}>
                    <div className={styles.closeButton} onClick={() => Navigate("/")}>
                        X
                    </div>
                </div>
                <form className={styles.loginForm} onSubmit={handleSubmit}>
                    <div className={styles.titleWrapper}>
                        <img src="./Logo.svg" alt="" />
                        <h1 className={styles.loginTitle}>PeTinder</h1>
                    </div>
                    <FormInput id={"email"} name={"email"} label={"Email"} type={"email"} required disabled={false} />
                    <FormInput id={"senha"} name={"senha"} label={"Senha"} type={"password"} required disabled={false} />
                    <div className={styles.loginLinkWrapper}>
                        <span>Criar conta no </span><a onClick={() => Navigate("/cadastro")} className={styles.loginLink}>PeTinder</a>
                    </div>
                    <div className={styles.loginButtonWrapper}>
                        <PrimaryButton type={"submit"} text={"Entrar"} />
                        <SecondaryButton type={"button"} text={"Esqueci a senha"} />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login;