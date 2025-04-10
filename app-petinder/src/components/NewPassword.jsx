import "./components.css";
import FormInput from "./FormInput";
import SecondaryButton from "./SecondaryButton";

export default function NewPassword(props) {
    if (!props.passwordOpen) return null;

    const teste = () => {
        alert("precisa colocar validação e FIM");
    }

    return (
        <div>
            <div className="modalPassword" onClick={(e) => e.stopPropagation()}>
                <div className="closeButtonModal" onClick={props.setPasswordOpen}>
                    <img src="/left.png" />
                    <span>Voltar</span>
                </div>

                <div className="modalContent">
                    <h1>Redefinição de senha</h1>
                    <FormInput label="Nova senha" />
                    <FormInput label="Confirmar senha" />
                    <div onClick={teste}>
                        <SecondaryButton type="button" text="Enviar" />
                    </div>
                </div>
            </div>
        </div>
    );
}