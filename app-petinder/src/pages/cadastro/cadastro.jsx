import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FormInput from "../../components/FormInput";
import PrimaryButton from "../../components/PrimaryButton";
import styles from './cadastro.module.css';
import { url } from "../../provider/apiInstance";
import reqs from "../../reqs";
import Toast from "../../components/Toast";
import GenericModal from "../../components/GenericModal";
import Logo from "../../components/Logo";
import Strings from "../../utils/strings"

const terms = `
<b>1. Introdução</b><br/>
Bem-vindo ao PeTinder! Nossa plataforma tem como objetivo conectar adotantes a ONGs para facilitar o processo de adoção de pets. Ao utilizar o PeTinder, você concorda com os seguintes Termos e Condições de Uso.<br/><br/>

<b>2. Coleta e Uso de Dados</b><br/>
<b>2.1.</b> O PeTinder coleta e armazena informações fornecidas pelos usuários, como nome, e-mail, telefone, localização e preferências de adoção, com o objetivo de aprimorar a experiência do usuário e otimizar o funcionamento da plataforma.<br/>
<b>2.2.</b> Os dados também podem ser utilizados para fins estatísticos, análise de comportamento e melhoria dos serviços oferecidos pelo PeTinder.<br/>
<b>2.3.</b> Os dados fornecidos pelos usuários não serão vendidos ou compartilhados com terceiros para fins comerciais sem o consentimento do usuário.<br/><br/>

<b>3. Consulta de Dados em Casos de Maus-Tratos</b><br/>
<b>3.1.</b> O PeTinder se reserva o direito de compartilhar informações de usuários com autoridades competentes, ONGs e instituições de proteção animal caso haja suspeita ou denúncia fundamentada de maus-tratos aos animais.<br/>
<b>3.2.</b> O usuário concorda que a plataforma pode fornecer seus dados para investigação, sempre em conformidade com as leis de proteção de dados vigentes.<br/><br/>

<b>4. Responsabilidades do Usuário</b><br/>
<b>4.1.</b> O usuário se compromete a fornecer informações verídicas e completas durante o cadastro e uso da plataforma.<br/>
<b>4.2.</b> O usuário não deve utilizar a plataforma para fins ilegais, incluindo, mas não se limitando a, fraudes e práticas abusivas contra animais.<br/><br/>

<b>5. Alteração dos Termos</b><br/>
<b>5.1.</b> O PeTinder pode modificar estes Termos a qualquer momento. Notificações sobre mudanças serão enviadas aos usuários ou publicadas na plataforma.<br/><br/>

<b>6. Contato</b><br/>
Caso tenha dúvidas sobre estes Termos, entre em contato conosco através do e-mail petinder.suporte@gmail.com.<br/>
Ao utilizar o PeTinder, você declara estar de acordo com estes Termos e Condições de Uso.`;

const law = `O abandono, a negligência, a falta de alimentação, a soltura irresponsável e o tratamento inadequado de animais são formas de maus-tratos, sujeitas a penalidades conforme o artigo 32 da Lei Federal 9.605/1998 (Lei de Crimes Ambientais) e a Lei Municipal 13.131/2001 (Lei de Posse Responsável). Em caso de dúvidas, busque sempre orientação de profissionais qualificados, evitando informações de fontes não especializadas.`;


function Cadastro() {
    const Navigate = useNavigate();
    const [modalTermos, setModalTermos] = useState(false);
    const [modalWarning, setModalWarning] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [counter, setCounter] = useState(5);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        let timer;
        if (modalWarning) {
            setIsButtonDisabled(true);
            setCounter(5);

            timer = setInterval(() => {
                setCounter((prev) => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        setIsButtonDisabled(false);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }

        return () => clearInterval(timer);
    }, [modalWarning]);


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

        if (name === "dataNasc") {
            const ano = value.split("-")[0];
            if (ano.length > 4) {
                return;
            }
        }

        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));

        if (errors[name]) {
            const inputElement = document.getElementById(name);
            if (inputElement) {
                inputElement.style.border = "2px solid black";
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

    const validateForm = async () => {
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

        const email = formValues.email;
        const senha = formValues.senha;

        const contemAcento = /[^\u0000-\u007F]/.test(email);
        const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

        const temLetraMaiuscula = /[A-Z]/.test(senha);
        const temLetraMinuscula = /[a-z]/.test(senha);
        const temSimbolo = /[^A-Za-z0-9]/.test(senha);
        const tamanhoValido = senha.length >= 8;

        if (!formValues.nome.trim()) {
            newErrors.nome = Strings.erroNome1;
            setErrorStyle("nome");
        } else if (formValues.nome.trim().length < 3) {
            newErrors.nome = Strings.erroNome2;
            setErrorStyle("nome");
        } else if (/[^a-zA-ZÀ-ÿ\s]/.test(formValues.nome.trim())) {
            newErrors.nome = Strings.erroNome3;
            setErrorStyle("nome");
        } else {
            resetInputStyle("nome");
        }

        if (!email.trim()) {
            newErrors.email = Strings.erroEmail1;
            setErrorStyle("email");
        } else if (email.includes(" ")) {
            newErrors.email = Strings.erroEmail2;
            setErrorStyle("email");
        } else if (contemAcento) {
            newErrors.email = Strings.erroEmail3;
            setErrorStyle("email");
        } else if (!email.includes("@") || email.lastIndexOf(".") < email.indexOf("@")) {
            newErrors.email = Strings.erroEmail4;
            setErrorStyle("email");
        } else if (!emailValido) {
            newErrors.email = Strings.erroEmail4;
            setErrorStyle("email");

        } else {
            resetInputStyle("email");
        }

        if (!senha.trim()) {
            newErrors.senha = Strings.erroSenha1;
            setErrorStyle("senha");
        } else if (!tamanhoValido) {
            newErrors.senha = Strings.erroSenha2;
            setErrorStyle("senha");
        } else if (!temLetraMaiuscula) {
            newErrors.senha = Strings.erroSenha3;
            setErrorStyle("senha");
        } else if (!temLetraMinuscula) {
            newErrors.senha = Strings.erroSenha4;
            setErrorStyle("senha");
        } else if (!temSimbolo) {
            newErrors.senha = Strings.erroSenha5;
            setErrorStyle("senha");
        } else {
            resetInputStyle("senha");
        }

        if (formValues.confSenha !== formValues.senha) {
            newErrors.confSenha = Strings.erroSenha6;
            setErrorStyle("confSenha");
        } else {
            resetInputStyle("confSenha");
        }

        if (!formValues.dataNasc) {
            newErrors.dataNasc = Strings.erroDataNasc1;
            setErrorStyle("dataNasc");
        } else {
            const birthDate = new Date(formValues.dataNasc);
            const today = new Date();
            const age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();
            const dayDiff = today.getDate() - birthDate.getDate();
            const adjustedAge = monthDiff > 0 || (monthDiff === 0 && dayDiff >= 0) ? age : age - 1;

            if (adjustedAge < 21) {
                newErrors.dataNasc = Strings.erroDataNasc2;
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

        const isValid = await validateForm();

        if (!isValid) {
            return;
        }

        if (!isChecked) {
            setToast({ mensagem: "Você precisa aceitar os Termos de condição.", tipo: "erro" });
            return;
        }

        setModalWarning(true);
    };

    const createAccount = async () => {
        if (isLoading) return;

        setIsLoading(true);

        try {
            const result = await reqs.CadastrarUsuario(formValues);
            
            if (result.success) {
                setFormValues({
                    nome: "",
                    email: "",
                    senha: "",
                    confSenha: "",
                    dataNasc: "",
                });
                setIsChecked(false);
                setToast({
                    mensagem: Strings.sucessoCriacao,
                    tipo: "sucesso"
                });

                setTimeout(() => {
                    Navigate("/login");
                }, 1100);
            } else {
                const error = result.error;
                setIsButtonDisabled(false);

                if (error.response && error.response.status === 409) {
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        email: Strings.erroEmail5,
                    }));
                    setModalWarning(false);
                    const inputElement = document.getElementById("email");
                    if (inputElement) {
                        inputElement.style.border = "2px solid red";
                        inputElement.closest(".input-container").classList.add("error");
                    }
                } else {
                    console.error("Erro:", error);
                    setToast({
                        mensagem: Strings.erro,
                        tipo: "erro"
                    });
                }
            }
        } catch (error) {
            setIsButtonDisabled(false);
            console.error("Erro inesperado:", error);
            setToast({
                mensagem: Strings.erro,
                tipo: "erro"
            });
        } finally {
            setIsLoading(false);
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
                            <Logo />
                            <div className={styles.containerGap}>
                                <div className={styles.registerFormWrapper}>
                                    <FormInput
                                        id="nome"
                                        name="nome"
                                        label={Strings.nome}
                                        type="text"
                                        required
                                        value={formValues.nome}
                                        onChange={handleInputChange}
                                        error={errors.nome}
                                    />
                                    <FormInput
                                        id="email"
                                        name="email"
                                        label= {Strings.email}
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
                                    <FormInput
                                        id="confSenha"
                                        name="confSenha"
                                        label={Strings.confSenha}
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
                                            label={Strings.dataNasc}
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
                                    Li e aceito os <a href="#" onClick={() => setModalTermos(true)} className={styles.termsLink}>Termos de condição</a>
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
                <GenericModal
                    isOpen={modalTermos}
                    onClose={() => setModalTermos(false)}
                    title={"Termos e Condições de Uso - PeTinder"}
                    text={terms}
                />

                <GenericModal
                    isOpen={modalWarning}
                    onClose={() => setModalWarning(false)}
                    title={"IMPORTANTE"}
                    text={law}
                    width="500px"
                    height="500px"
                >
                    <button
                        type="button"
                        className={`primary-button ${isLoading || isButtonDisabled ? styles.disabledButton : ''}`}
                        disabled={isLoading || isButtonDisabled}
                        onClick={async () => {
                            if (isLoading) return;
                            await createAccount();
                        }}
                    >
                        {isLoading ? "Criando conta..." : (isButtonDisabled ? `Aguarde: ${counter}s` : "Estou ciente")}
                    </button>
                </GenericModal>
            </div>
        </>
    );
}

export default Cadastro;