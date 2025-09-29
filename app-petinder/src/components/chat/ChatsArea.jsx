import React, { useEffect, useState } from "react";
import ChatCard from "./ChatCard";
import reqs from "../../reqs";

function ChatsArea(props) {
    const [pendingChats, setPendingChats] = useState([]);

    useEffect(() => {
        const userId = sessionStorage.getItem("userId");
        if (!userId) return;
        
        const fetchPendingChats = async () => {
            const result = await reqs.getPendingForChatsArea(userId);
            if (result.success) {
                setPendingChats(result.data);
            } else {
                setPendingChats([]);
            }
        };
        
        fetchPendingChats();
    }, [props.refreshKey]);

    return (
        <div className="chatsArea">
            {(Array.isArray(pendingChats) ? pendingChats : []).map((chat) => (
                <div key={chat.petId} onClick={() => props.onSelectChat({
                    petId: chat.petId,
                    ongNome: chat.ongInfo?.nome,
                    petNome: chat.petNome,
                    ongLink: chat.ongInfo?.link,
                    ongId: chat.ongId
                })}>
            <ChatCard
                petId={chat.petId}
                petNome={chat.petNome}
                ongNome={chat.ongInfo?.nome}
                descricao={chat.descricao}
                ongId={chat.ongId}
            />
        </div>
    ))
}
        </div >
    );
}

export default ChatsArea;