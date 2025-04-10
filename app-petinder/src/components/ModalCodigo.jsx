import { useState } from "react";
import "./components.css";
import SecondaryButton from "./SecondaryButton";
import InsertCode from "./InsertCode";
import NewPassword from "./NewPassword";


export default function ModalCodigo(props) {
    if (!props.isOpen) return null;

    const [changeToPassword, setChangeToPassword] = useState(false);
    const [codigoDigitado, setCodigoDigitado] = useState("");


    const changeModalPassword = () => {
        if (codigoDigitado === props.cod) {
            alert("Código correto!");
            setChangeToPassword(true);
        } else {
            alert("Código incorreto. Tente novamente.");
        }
    };

    const codigoCompleto = (code) => {
        setCodigoDigitado(code);
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
                    <InsertCode length={5} onComplete={codigoCompleto} codigoDigitado={""}/>
                    <div onClick={changeModalPassword}>
                    <SecondaryButton type="button" text="Validar código" />
                    </div>
                </div>
            </div>
                <NewPassword passwordOpen={changeToPassword}  setPasswordOpen={() => setChangeToPassword(false)}/>
        </div>
    );
}
