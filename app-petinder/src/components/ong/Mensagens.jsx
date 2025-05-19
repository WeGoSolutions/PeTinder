import { MdPermPhoneMsg } from "react-icons/md";
import "../components.css";

export default function Mensagens({nome, mensagem, data, telefone, email, imgSrc}) {
    return (
        <div className="messageContainer">
            <img src={imgSrc} className="imgPerfil" />

            <div className="textos">
                <h1>{nome}</h1>
                <p>{mensagem}</p>
                <span>{data}</span>
            </div>

            <div className="contact">
                {(telefone || email) && (
                    <div className="baloon">
                        {telefone && <p>Telefone: {telefone}</p>}
                        {email && <p>E-mail: {email}</p>}
                    </div>
                )}
                <MdPermPhoneMsg size={50} className="iconPhone" />
            </div>
        </div>
    )
}