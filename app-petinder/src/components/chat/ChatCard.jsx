import { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import reqs from "../../reqs";

function ChatCard({ petNome, ongNome, descricao, petId }) {
    const titleTooltip = `${petNome} • ${ongNome}`

    const [urlImage, setUrlImage] = useState("");

    useEffect(() => {
        async function fetchOngImage() {
            if (!petId) return;
            
            const result = await reqs.getPetInfosAndOngImage(petId);
            setUrlImage(result.imageUrl);
        }
        
        fetchOngImage();
    }, [petId]);

    return (
        <div className="chatCardContainer" tabIndex="0" title={titleTooltip}>
            <div className="cardLogoOng">
                {urlImage ? (
                    <img src={urlImage} alt={petNome} />
                ) : (
                    <CgProfile size={55}/>
                )}
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