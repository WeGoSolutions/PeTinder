import UserImage from "./UserImage";
import SecondaryButton from "./SecondaryButton";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { url } from "../provider/apiInstance";

function NotifyArea() {
    const Navigate = useNavigate();
    const name = sessionStorage.userName;
    const userId = sessionStorage.getItem("userId");
    const [userImageSrc, setUserImageSrc] = useState(null);

    useEffect(() => {
        if (!userId) {
            setUserImageSrc(false);
            return;
        }
        url.get(`/users/${userId}/imagem`)
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
        <div className="notifyArea-area">
            <div className="notifyContainer">
                <div className="notifyIsland">
                    <img src="./setaUP.svg" alt="Seta para cima" />
                </div>
                <div className="notifyAreaContainer">
    
                </div>
            </div>
        </div>
    );
}

export default NotifyArea;