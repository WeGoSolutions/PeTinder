import "./components.css";
import FormInput from "./FormInput";
import SecondaryButton from "./SecondaryButton";
import { useState, useEffect } from "react";
import emailjs from '@emailjs/browser';
import { serviceID, templateID, publicKey } from "../provider/apiInstance"
import ModalCodigo from "./ModalCodigo";
import reqs from "../reqs";

export default function Modal(props) {
    const [openModalCodigo, setOpenModalCodigo] = useState(false);
    const [formValues, setFormValues] = useState({ email: "" });
    const [errors, setErrors] = useState({});
    const [codigo, setCodigo] = useState("");
    const [isValid, setIsValid] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    function gerarCodigo() {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));

        if (value.trim()) {
            resetInputStyle("emailredefinir");
            setErrors((prevErrors) => {
                const updatedErrors = { ...prevErrors };
                delete updatedErrors[name];
                return updatedErrors;
            });
        }
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;

        if (value.trim()) {
            let newErrors = {};
            if (!/\S+@\S+\.\S+/.test(value)) {
                newErrors[name] = "Digite um email válido.";
                setErrorStyle("emailredefinir");
            } else {
                resetInputStyle("emailredefinir");
            }
            setErrors((prevErrors) => ({
                ...prevErrors,
                ...newErrors,
            }));
        }
    };

    const changeModal = async () => {
        if (isButtonDisabled) return; // Impede múltiplos envios
        setIsButtonDisabled(true);
        if (validateEmail()) {
            setIsLoading(true);

            const emailExiste = await reqs.validarEmailNoBackend(formValues.email);
            if (!emailExiste) {
                setErrors({ email: "Este e-mail não está cadastrado." });
                setErrorStyle("emailredefinir");
                setIsLoading(false);
                setIsButtonDisabled(false);
                return;
            }

            const codigo = gerarCodigo();
            const templateParams = {
                to_email: formValues.email,
                digito1: codigo[0],
                digito2: codigo[1],
                digito3: codigo[2],
                digito4: codigo[3],
                digito5: codigo[4],
                digito6: codigo[5],
                codigo: codigo
            };
            setCodigo(codigo);
            setIsValid(true);

            const TWO_MINUTES = 2 * 60 * 1000;
            setTimeout(() => setIsValid(false), TWO_MINUTES);

            try {
                const response = await emailjs.send(
                    serviceID,
                    templateID,
                    templateParams,
                    publicKey
                );
                setOpenModalCodigo(true);
            } catch (error) {
                console.error('Erro ao enviar o email:', error);
            } finally {
                setIsLoading(false);
                // O botão só será reabilitado se o modal for fechado ou timeout, não aqui
            }
        } else {
            setIsButtonDisabled(false);
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
            setIsButtonDisabled(false); // Reabilita o botão ao abrir o modal
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
                            onBlur={handleBlur}
                            error={errors.email}
                        />
                        <div onClick={isButtonDisabled ? undefined : changeModal}>
                            <SecondaryButton
                                type="button"
                                text={
                                    isLoading ? (
                                        <span className="loading-text">
                                            Enviando<span className="loading-dots"></span>
                                        </span>
                                    ) : "Enviar código"
                                }
                                disabled={isButtonDisabled}
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
                    emailReset={formValues.email}
                />
            </div>
        );
    }

    return null;
}