import { MdPermPhoneMsg } from "react-icons/md";
import { MdOutlineContactPhone } from "react-icons/md";

import "../components.css";
import { useState } from "react";

export default function Mensagens({nome, mensagem, data, telefone, email, imgSrc}) {
    const [showBaloon, setShowBaloon] = useState(false);

    return (
        <div className="messageContainer">
            <img src={imgSrc} className="imgPerfil" />

            <div className="textos">
                <h1>{nome}</h1>
                <p>{mensagem}</p>
                <span>{data}</span>
            </div>

            <div className="contact">
                {(telefone || email) && showBaloon && (
                    <div className="baloon">
                        {telefone && <p>Telefone: {telefone}</p>}
                        {email && <p>E-mail: {email}</p>}
                    </div>
                )}
                <MdOutlineContactPhone
                    size={40}
                    className="iconPhone"
                    onClick={() => setShowBaloon((prev) => !prev)}
                />
            </div>
        </div>
    )
}