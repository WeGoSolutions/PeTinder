import { useEffect, useState } from "react";
import { url } from "../../provider/apiInstance";

function ChatHeader(props) {
    const titleTooltip = `${props.petName} • ${props.ongName}`

    const [urlImage, setUrlImage] = useState("");

    //O chat.jsx chama esse componente, porem mesmo colocando a props lá quando chama esse ChatHeader, não vem valor para buscar a imagem da ong
    useEffect(() => {
        async function fetchOngImage() {
            if (!props.petId) return;
            try {
                // 1. Busca o pet para pegar o ongId
                const petRes = await url.get(`/pets/${props.petId}`);
                const ongId = petRes.data.ongId;
                if (!ongId) return;

                // 2. Busca a imagem da ONG
                const ongRes = await url.get(`/ongs/${ongId}/imagem/arquivo`);
                setUrlImage(ongRes.data.imageUrl);
            } catch (err) {
                setUrlImage(""); // fallback
            }
        }
        fetchOngImage();
    }, [props.petId]);

    return (
        <div className="chatHeader" title={titleTooltip}>
            <div className="ongLogo">
                <img src={urlImage} alt="" />
            </div>
            <div className="chatTitle">
                <div className="petName">
                    <h2>{props.petName}</h2>
                </div>
                {props.petName && props.ongName && (
                    <img src="../../bolinha.svg" alt="" />
                )}
                <div className="ongName">
                    <h2>{props.ongName}</h2>
                </div>
            </div>
        </div>
    )
}
export default ChatHeader;