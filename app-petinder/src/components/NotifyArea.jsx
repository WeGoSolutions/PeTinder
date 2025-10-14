import UserImage from "./UserImage";
import SecondaryButton from "./SecondaryButton";
import NotifyCard from "./NotifyCard"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { url } from "../provider/apiInstance";

function NotifyArea() {
    const Navigate = useNavigate();
    const name = sessionStorage.userName;
    const userId = sessionStorage.getItem("userId");
    const [userImageSrc, setUserImageSrc] = useState(null);

    const notifications = [
  {
    id: 1,
    notifyType: "ADOPTED",
    title: "É seu!",
    description: "Adoção confirmada! Lucifer ganhou um novo lar.",
    viewed: false
  },
  {
    id: 2,
    notifyType: "NOTADOPTED",
    title: "Adoção não realizada",
    description: "Infelizmente a adoção do Thor não foi concluída.",
    viewed: false
  },
  {
    id: 3,
    notifyType: "OTHERS",
    title: "Atualização",
    description: "Seu perfil foi atualizado com sucesso.",
    viewed: true
  },
  {
    id: 2,
    notifyType: "NOTADOPTED",
    title: "Adoção não realizada",
    description: "Infelizmente a adoção do Thor não foi concluída.",
    viewed: false
  },
  {
    id: 3,
    notifyType: "OTHERS",
    title: "Atualização",
    description: "Seu perfil foi atualizado com sucesso.",
    viewed: true
  },
  {
    id: 3,
    notifyType: "OTHERS",
    title: "Atualização",
    description: "Seu perfil foi atualizado com sucesso.",
    viewed: true
  },
  {
    id: 2,
    notifyType: "NOTADOPTED",
    title: "Adoção não realizada",
    description: "Infelizmente a adoção do Thor não foi concluída.",
    viewed: false
  },
  {
    id: 3,
    notifyType: "OTHERS",
    title: "Atualização",
    description: "Seu perfil foi atualizado com sucesso.",
    viewed: true
  }
];

    useEffect(() => {

    }, [userId]);

    return (
        <div className="notifyArea-area">
            <div className="notifyContainer">
                <div className="notifyIsland">
                    <img src="./setaUP.svg" alt="Seta para cima" />
                </div>
                <div className="notifyAreaContainer">
                    {notifications.map((notify) => (
                        <NotifyCard
                            notifyType={notify.notifyType}
                            title={notify.title}
                            description={notify.description}
                            viewed={notify.viewed}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default NotifyArea;