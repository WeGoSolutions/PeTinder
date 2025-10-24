import UserImage from "./UserImage";
import SecondaryButton from "./SecondaryButton";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import reqs from "../reqs";

function PerfilArea() {
    const Navigate = useNavigate();
    const name = sessionStorage.userName;
    const userId = sessionStorage.getItem("userId");
    const [userImageSrc, setUserImageSrc] = useState(null);

    useEffect(() => {
        if (!userId) {
            setUserImageSrc(false);
            return;
        }
        
        const fetchUserImage = async () => {
            const result = await reqs.getUserImage(userId);
            setUserImageSrc(result.imagemUrl);
        };
        
        fetchUserImage();
    }, [userId]);

    return (
        <div className="perfil-area">
            <div className="perfilContainer">
                <div className="perfilIsland">
                    <img src="./setaUP.svg" alt="Seta para cima" />
                </div>
                <div className="perfilAreaContainer">
                    <div className="perfialAreaImage">
                        <UserImage src={userImageSrc} />
                    </div>
                    <div className="perfialAreaText">
                        <div className="perfilAreaName">
                            <h3>{name}</h3>
                        </div>
                        <div className="perfilAreaButton">
                            <div onClick={() => Navigate("/config")}>
                                <SecondaryButton type="button" text="Editar Perfil" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PerfilArea;