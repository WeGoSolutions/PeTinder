import "./components.css";
import FormInput from "./FormInput";
import SecondaryButton from "./SecondaryButton";
import ModalCodigo from "./ModalCodigo";
import { useState } from "react";

import emailjs from '@emailjs/browser';

export default function Modal(props) {
    const [openModalCodigo, setOpenModalCodigo] = useState(false);
    const [formValues, setFormValues] = useState({ email: "" });
    const [errors, setErrors] = useState({});
    const [codigo, setCodigo] = useState("");

    function gerarCodigo() {
        return Math.floor(10000 + Math.random() * 90000).toString(); // código de 6 dígitos
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

    const [isLoading, setIsLoading] = useState(false); // estado de loading

    const changeModal = () => {
        if (validateEmail()) {
            setIsLoading(true);
            const codigo = gerarCodigo();
            const templateParams = {
                to_email: formValues.email,
                codigo: codigo
            };
            setCodigo(codigo);

            emailjs.send(
                'service_yjif6m9',
                'template_w7bmpvc',
                templateParams,
                'i-8NIqNC4S7DXzEPh'
            ).then(
                (response) => {
                    console.log('Email enviado com sucesso!', response.status, response.text);
                    console.log('Email enviado para:', formValues.email);
                    setOpenModalCodigo(true);
                },
                (error) => {
                    console.error('Erro ao enviar o email:', error);
                    alert("Ocorreu um erro ao enviar o código. Tente novamente.");
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
            <ModalCodigo isOpen={openModalCodigo} cod={codigo} setModalOpen={() => setOpenModalCodigo(false)} />
            </div>
        );
    }
    return null;
}
