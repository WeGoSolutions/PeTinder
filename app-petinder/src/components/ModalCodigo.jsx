import { useState } from "react";
import "./components.css";
import SecondaryButton from "./SecondaryButton";
import InsertCode from "./InsertCode";
import NewPassword from "./NewPassword";

export default function ModalCodigo(props) {
    if (!props.isOpen) return null;

    const [changeToPassword, setChangeToPassword] = useState(false);
    const [codigoDigitado, setCodigoDigitado] = useState("");
    const [sendingCode, setSendingCode] = useState(false);
    const [resetInputs, setResetInputs] = useState(0);
    const [mostrarErro, setMostrarErro] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    const changeModalPassword = () => {
        if (isButtonDisabled) return;
        setIsButtonDisabled(true);
        setSendingCode(true);
        setMostrarErro(true);

        if (!props.isValid && codigoDigitado === props.cod) {
            setCodigoExpiradoStyle();
            setIsButtonDisabled(false); // Reabilita se código expirado
            return;
        }

        if (codigoDigitado === props.cod && props.isValid) {
            setChangeToPassword(true);
        } else {
            setIsButtonDisabled(false); // Reabilita se código inválido
        }
    };

    const setCodigoExpiradoStyle = () => {
        const inputElement = document.getElementById("codigoInput");
        if (inputElement) {
            inputElement.style.border = "2px solid orange";
        }
    };

    const codigoCompleto = (code) => {
        setCodigoDigitado(code);
        setMostrarErro(false);
    };

    const [isDisabled, setIsDisabled] = useState(false);
    const [timer, setTimer] = useState(60);

    const handleResendCode = () => {
        setIsDisabled(true);
        setSendingCode(false);
        setMostrarErro(false);
        setCodigoDigitado("");
        setResetInputs(prev => prev + 1);
        props.resendCod();

        let countdown = 60;
        setTimer(countdown);
        const interval = setInterval(() => {
            countdown -= 1;
            setTimer(countdown);
            if (countdown <= 0) {
                clearInterval(interval);
                setIsDisabled(false);
            }
        }, 1000);
    };

    return (
        <div>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <div className="closeButtonModal" onClick={props.setModalOpen}>
                    <img src="/left.png" />
                    <span>Voltar</span>
                </div>

                <div className="modalContent">
                    <h1>Insira o código de verificação</h1>
                    <InsertCode
                        id="codigoInput"
                        length={6}
                        onComplete={codigoCompleto}
                        codigoDigitado={codigoDigitado}
                        reset={resetInputs}
                    />
                    <span className="invalidCod">
                        {mostrarErro && sendingCode && codigoDigitado !== props.cod
                            ? "Código inválido. Tente novamente."
                            : mostrarErro && sendingCode && codigoDigitado === props.cod && !props.isValid
                                ? "Código expirado. Reenvie o código."
                                : " "}
                    </span>

                    <div onClick={isButtonDisabled ? undefined : changeModalPassword}>
                        <SecondaryButton type="button" text="Validar código" disabled={isButtonDisabled} />
                    </div>
                    <span
                        className={`resend ${isDisabled ? "disabled" : ""}`}
                        onClick={!isDisabled ? handleResendCode : null}
                    >
                        Reenviar código
                        {isDisabled && (
                            <>
                                {": "}
                                <span style={{ color: "#80465D" }}>0:{String(timer).padStart(2, '0')}</span>
                            </>
                        )}
                    </span>
                </div>
            </div>
            <NewPassword
                passwordOpen={changeToPassword}
                setPasswordOpen={() => setChangeToPassword(false)}
                onCloseAll={props.onCloseAll}
                emailReset={props.emailReset}
            />
        </div>
    );
}