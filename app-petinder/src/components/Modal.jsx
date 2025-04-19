import "./components.css";
import FormInput from "./FormInput";
import SecondaryButton from "./SecondaryButton";
import ModalCodigo from "./ModalCodigo";
import { useState, useEffect } from "react";

import emailjs from '@emailjs/browser';
import { serviceID, templateID, publicKey } from "../provider/apiInstance"

export default function Modal(props) {
    const [openModalCodigo, setOpenModalCodigo] = useState(false);
    const [formValues, setFormValues] = useState({ email: "" });
    const [errors, setErrors] = useState({});
    const [codigo, setCodigo] = useState("");
    const [isValid, setIsValid] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    function gerarCodigo() {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));

        if (errors[name]) {
            setErrors((prevErrors) => {
                const updatedErrors = { ...prevErrors };
                delete updatedErrors[name];
                return updatedErrors;
            });
        }
    };

    const changeModal = () => {
        if (validateEmail()) {
            setIsLoading(true);
            const codigo = gerarCodigo();
            const templateParams = {
                to_email: formValues.email,
                codigo: codigo
            };
            setCodigo(codigo);
            setIsValid(true);
            
            const TWO_MINUTES = 2 * 60 * 1000;
            setTimeout(() => setIsValid(false), TWO_MINUTES);

            emailjs.send(
                serviceID,
                templateID,
                templateParams,
                publicKey
            ).then(
                (response) => {
                    console.log('Email enviado com sucesso!', response.status, response.text);
                    console.log('Email enviado para:', formValues.email);
                    setOpenModalCodigo(true);
                },
                (error) => {
                    console.error('Erro ao enviar o email:', error);
                }
            ).finally(() => {
                setIsLoading(false);
            });
        }
    };

    const validateEmail = () => {
        let newErrors = {};
        if (!formValues.email.trim()) {
            newErrors.email = "O email é obrigatório.";
            setErrorStyle("emailredefinir");
        } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
            newErrors.email = "Digite um email válido.";
            setErrorStyle("emailredefinir");
        } else {
            resetInputStyle("emailredefinir");
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

    useEffect(() => {
        if (props.isOpen) {
            setFormValues({ email: "" });
            setErrors({});
            setCodigo("");
            resetInputStyle("emailredefinir");
            setOpenModalCodigo(false);
        }
    }, [props.isOpen]);


    if (props.isOpen) {
        return (
            <div className="modalBackground">
                <div className="modal" onClick={(e) => e.stopPropagation()}>
                    <div className="closeButtonModal" onClick={props.setModalOpen}>
                        <img src="/left.png" />
                        <span>Voltar</span>
                    </div>

                    <div className="modalContent">
                        <h1>Redefinição de senha</h1>
                        <FormInput
                            id="emailredefinir"
                            name="email"
                            label="Email"
                            type="email"
                            required
                            value={formValues.email}
                            onChange={handleInputChange}
                            error={errors.email}
                        />
                        <div onClick={changeModal}>
                            <SecondaryButton
                                type="button"
                                text={
                                    isLoading ? (
                                        <span className="loading-text">
                                            Enviando<span className="loading-dots"></span>
                                        </span>
                                    ) : "Enviar código"
                                }
                            />
                        </div>
                    </div>
                </div>
                <ModalCodigo
                    isOpen={openModalCodigo}
                    cod={codigo}
                    setModalOpen={() => setOpenModalCodigo(false)}
                    resendCod={changeModal}
                    onCloseAll={props.onCloseAll}
                    isValid={isValid}
                />
            </div>
        );
    }
    return null;
}
