import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FormInput from "../../components/FormInput";
import PrimaryButton from "../../components/PrimaryButton";
import SecondaryButton from "../../components/SecondaryButton";
import Modal from "../../components/Modal";
import styles from './login.module.css';
import { url } from "../../provider/apiInstance";
import reqs from "../../reqs";
import Toast from "../../components/Toast";
import Logo from "../../components/Logo";
import Strings from "../../utils/strings"

function Login() {
    const Navigate = useNavigate();

    const [formValues, setFormValues] = useState({ email: "", senha: "" });
    const [errors, setErrors] = useState({});
    const [openModal, setOpenModal] = useState(false);
    const [toast, setToast] = useState({ mensagem: '', tipo: 'sucesso' });
    const [loginType, setLoginType] = useState("usuario");

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

    const validateForm = () => {
        let newErrors = {};

        if (!formValues.email.trim()) {
            newErrors.email = Strings.erroEmail1;
            setErrorStyle("email");
            return
        } else {
            resetInputStyle("email");
        }

        if (!formValues.senha.trim()) {
            newErrors.senha = Strings.erroSenha1;
            setErrorStyle("senha");
            return
        } else {
            resetInputStyle("senha");
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
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

    const loginUser = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const result = await reqs.LoginUser(formValues.email, formValues.senha);
        
        if (result.success) {
            const data = result.data;
            
            sessionStorage.setItem("userId", data.id);
            sessionStorage.setItem('authToken', data.token);
            sessionStorage.setItem('userName', data.nome);
            sessionStorage.setItem('isNew', data.userNovo);

            setToast({
                mensagem: Strings.sucessoLogin,
                tipo: 'sucesso'
            });

            setTimeout(() => {
                Navigate('/initial');
            }, 1000);
        } else {
            if (result.errorType === "invalidCredentials") {
                setToast({
                    mensagem: Strings.erroLogin1,
                    tipo: 'erro'
                });
            } else {
                setToast({
                    mensagem: Strings.erroLogin2,
                    tipo: 'erro'
                });
            }
        }
    };

    const loginOng = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const result = await reqs.LoginOng(formValues.email, formValues.senha);
        
        if (result.success) {
            const data = result.data;
            sessionStorage.setItem("ongId", data.id);
            sessionStorage.setItem('userName', data.nome);

            setToast({
                mensagem: Strings.sucessoLogin,
                tipo: 'sucesso'
            });

            setTimeout(() => {
                Navigate('/ong/home');
            }, 1000);
        } else {
            if (result.errorType === "invalidCredentials") {
                setToast({
                    mensagem: Strings.erroLogin1,
                    tipo: 'erro'
                });
            } else {
                setToast({
                    mensagem: Strings.erroLogin2,
                    tipo: 'erro'
                });
            }
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (loginType === "usuario") {
            await loginUser(e);
        } else {
            await loginOng(e);
        }
    }

    const [isSubmitting, setIsSubmitting] = useState(false);

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
                <div className={styles.loginContainer}>
                    <div className={styles.closeButtonWrapper}>
                        <div className={styles.closeButton} onClick={() => Navigate("/")}>
                            <img src="./assets/closeButton.png" alt="" />
                        </div>
                    </div>
                    <div className={styles.switchWrapper}>
                        <div className={styles.switchContainer}>
                            <button
                                className={`${styles.switchButton} ${loginType === "usuario" ? styles.active : ""}`}
                                onClick={() => setLoginType("usuario")}
                                type="button"
                            >
                                Usuário
                            </button>
                            <button
                                className={`${styles.switchButton} ${loginType === "ong" ? styles.active : ""}`}
                                onClick={() => setLoginType("ong")}
                                type="button"
                            >
                                ONG
                            </button>
                        </div>
                    </div>
                    <form
                        className={styles.loginForm}
                        onSubmit={async (e) => {
                            setIsSubmitting(true);
                            await handleSubmit(e);
                            setIsSubmitting(false);
                        }}
                    >
                        <Logo />
                        <FormInput
                            id="email"
                            name="email"
                            label={Strings.email}
                            type="email"
                            required
                            value={formValues.email}
                            onChange={handleInputChange}
                            error={errors.email}
                        />
                        <FormInput
                            id="senha"
                            name="senha"
                            label={Strings.senha}
                            type="password"
                            required
                            value={formValues.senha}
                            onChange={handleInputChange}
                            error={errors.senha}
                        />
                        <div className={styles.loginLinkWrapper}>
                            <span>Criar conta no </span>
                            <a onClick={() => Navigate("/cadastro")} className={styles.loginLink}>PeTinder</a>
                        </div>
                        <div onClick={validateForm}
                            className={styles.loginButtonWrapper}>
                            <PrimaryButton type="submit" text="Entrar" disabled={isSubmitting} />
                        </div>
                        <div onClick={() => setOpenModal(true)}>
                            <SecondaryButton type="button" text="Esqueci a senha" />
                        </div>
                    </form>
                    <Modal isOpen={openModal} setModalOpen={() => setOpenModal(!openModal)} onCloseAll={() => setOpenModal(false)} />

                </div>
            </div>
        </>
    );
}

export default Login;
