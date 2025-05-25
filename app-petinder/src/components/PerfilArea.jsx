import UserImage from "./UserImage";
import SecondaryButton from "./SecondaryButton";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

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
        axios.get(`http://localhost:8080/users/${userId}/imagem`)
            .then(response => {
                setUserImageSrc(response.data.imageUrl);
            })
            .catch(error => {
                if (error.response && error.response.status === 404) {
                    setUserImageSrc(false);
                } else {
                    setUserImageSrc(false);
                }
            });
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