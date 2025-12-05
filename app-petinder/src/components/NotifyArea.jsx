import UserImage from "./UserImage";
import SecondaryButton from "./SecondaryButton";
import NotifyCard from "./notifyCard";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { url } from "../provider/apiInstance";

function NotifyArea() {
    const Navigate = useNavigate();
    const name = sessionStorage.userName;
    const userId = sessionStorage.getItem("userId");
    const [userImageSrc, setUserImageSrc] = useState(null);
    const [notifications, setNotifications] = useState([]);

    const buscarNotificacoes = async () => {
        if (!userId) return;

        try {
            const response = await url.get(`/notifications/${userId}`);
            
            if (response.status === 200) {
                setNotifications(response.data);
            }
        } catch (err) {
            console.error("Erro ao buscar notificações:", err);
        }
    };

    const deletarNotificacao = async (notifyId) => {
        setNotifications(prev => prev.filter(n => n.notifyId !== notifyId));
        
        try {
            await url.delete(`/notifications/${userId}/${notifyId}`);
        } catch (err) {
            console.error("❌ Erro ao deletar notificação:", err);
            buscarNotificacoes();
        }
    };

    useEffect(() => {
        buscarNotificacoes();
        
        const interval = setInterval(buscarNotificacoes, 10000);
        
        return () => clearInterval(interval);
    }, [userId]);

    return (
        <div className="notifyArea-area">
            <div className="notifyContainer">
                <div className="notifyIsland">
                    <img src="./setaUP.svg" alt="Seta para cima" />
                </div>
                <div className="notifyAreaContainer">
                    {notifications.length === 0 ? (
                        <div className="no-notifications">
                            <p>Sem notificações no momento.</p>
                        </div>
                    ) : (
                        notifications.map((notify, index) => (
                            <NotifyCard
                                key={notify.notifyId || index}
                                notifyType={notify.notifyType}
                                title={notify.title}
                                description={notify.description}
                                viewed={notify.viewed}
                                onDelete={() => deletarNotificacao(notify.notifyId)}
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default NotifyArea;