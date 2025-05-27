import React, { useEffect, useState } from "react";
import ChatCard from "./ChatCard";
import { url } from "../../provider/apiInstance";

function ChatsArea(props) {
    const [pendingChats, setPendingChats] = useState([]);

    useEffect(() => {
        const userId = sessionStorage.getItem("userId");
        if (!userId) return;
        url.get(`/status/pending/ong/${userId}`)
            .then(res => setPendingChats(Array.isArray(res.data) ? res.data : []))
            .catch(err => {
                console.error("Erro ao buscar chats pendentes:", err);
                setPendingChats([]);
            });
    }, [props.refreshKey]);

    return (
        <div className="chatsArea">
            {(Array.isArray(pendingChats) ? pendingChats : []).map((chat) => (
                <div key={chat.petId} onClick={() => props.onSelectChat({
                    ongNome: chat.ongInfo?.nome,
                    petNome: chat.petNome,
                    ongLink: chat.ongInfo?.link
                })}>
                    <ChatCard
                        petId={chat.petId}
                        petNome={chat.petNome}
                        ongNome={chat.ongInfo?.nome}
                        descricao={chat.descricao}
                    />
                </div>
            ))}
        </div>
    );
}

export default ChatsArea;