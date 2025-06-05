import { useEffect, useState } from "react";
import { url } from "../../provider/apiInstance";

function ChatCard({ petNome, ongNome, descricao, petId }) {
    const titleTooltip = `${petNome} • ${ongNome}`

    const [urlImage, setUrlImage] = useState("");

   useEffect(() => {
        async function fetchOngImage() {
            if (!petId) return;
            try {
                // Busca o pet para pegar o ongId
                const petRes = await url.get(`/pets/${petId}`);
                const ongId = petRes.data.ongId;
                if (!ongId) return;

                // Busca a imagem da ONG
                const ongRes = await url.get(`/ongs/${ongId}/imagem/arquivo`);
                setUrlImage(ongRes.data?.imageUrl || "");
            } catch (err) {
                setUrlImage(""); // fallback
            }
        }
        fetchOngImage();
    }, [petId]);

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