import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FormInput from "../../components/FormInput";
import PrimaryButton from "../../components/PrimaryButton";
import SecondaryButton from "../../components/SecondaryButton";
import Modal from "../../components/Modal";
import styles from './login.module.css';
import { url } from "../../provider/apiInstance";
import Toast from "../../components/Toast";
import Logo from "../../components/Logo";

function Login() {
    const Navigate = useNavigate();

    const [formValues, setFormValues] = useState({ email: "", senha: "" });
    const [errors, setErrors] = useState({});
    const [openModal, setOpenModal] = useState(false);
    const [toast, setToast] = useState({ mensagem: '', tipo: 'sucesso' });

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
            newErrors.email = "O email é obrigatório.";
            setErrorStyle("email");
            return
        } else {
            resetInputStyle("email");
        }

        if (!formValues.senha.trim()) {
            newErrors.senha = "A senha é obrigatória.";
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            url.post("/users/login", {
                email: formValues.email,
                senha: formValues.senha

            }).then(response => {
                if (response.status === 200 && response.data?.token) {
                    const data = response.data;
                    console.log(data);
                    sessionStorage.setItem("userId", data.id);
                    sessionStorage.setItem('authToken', data.token);
                    sessionStorage.setItem('isNew', data.userNovo)

                    setToast({
                        mensagem: 'Login realizado com sucesso!',
                        tipo: 'sucesso'
                    });

                    setTimeout(() => {
                        Navigate('/initial');
                    }, 1000);
                } else {
                    setToast({
                        mensagem: 'Ops! Ocorreu um erro interno.',
                        tipo: 'erro'
                    });
                    return;
                }
            })
                .catch((error) => {
                    setToast({
                        mensagem: 'Erro ao fazer login. Verifique suas credenciais.',
                        tipo: 'erro'
                    });
                    console.error("Erro ao fazer login:", error);
                    setToast({
                        mensagem: 'Conta não encontrada.',
                        tipo: 'erro'
                    });
                });
        } catch (error) {
            setToast({
                mensagem: 'Erro ao fazer login. Verifique suas credenciais.',
                tipo: 'erro'
            });
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
                <div className={styles.loginContainer}>
                    <div className={styles.closeButtonWrapper}>
                        <div className={styles.closeButton} onClick={() => Navigate("/")}>
                            <img src="./assets/closeButton.png" alt="" />
                        </div>
                    </div>
                    <form className={styles.loginForm} onSubmit={handleSubmit}>
                        <Logo />
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
                        <div className={styles.loginLinkWrapper}>
                            <span>Criar conta no </span>
                            <a onClick={() => Navigate("/cadastro")} className={styles.loginLink}>PeTinder</a>
                        </div>
                        <div onClick={validateForm}
                            className={styles.loginButtonWrapper}>
                            <PrimaryButton type="submit" text="Entrar" />
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
