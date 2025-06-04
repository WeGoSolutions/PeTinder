import { useEffect, useState } from "react";
import { url } from "../../provider/apiInstance";

function ChatCard({ petNome, ongNome, descricao }) {
    const titleTooltip = `${petNome} • ${ongNome}`

    const [urlImage, setUrlImage] = useState("");

    useEffect(() => {
        // const ongId = sessionStorage.getItem("ongId"); // precisa de uma lógica para pegar o ID da ONG
        // if (!ongId) return;

        url.get(`/ongs/1/imagem/arquivo`)
            .then(res => {
                const data = res.data;

                setUrlImage(data.imageUrl);
            })
    }, [])

    return (
        <div className="chatCardContainer" tabIndex="0" title={titleTooltip}>
            <div className="cardLogoOng">
                <img src={urlImage} alt={petNome} />
            </div>
            <div className="cardTextsArea">
                <div className="cardTitle">
                    <h4>{petNome}</h4>
                    <img src="/bolinha.svg" alt="" />
                    <h4>{ongNome}</h4>
                </div>
                <div className="recentMessage">
                    {/* <p>{descricao}</p> */}
                </div>
            </div>
        </div>
    )
}

export default ChatCard;