import React, { useState, useEffect } from "react";
import "./components.css";
import Chat from "./chat/Chat";
import ChatsArea from "./chat/ChatsArea";
import LikedArea from "./LikedArea.jsx";
import { IoChatbubblesOutline } from "react-icons/io5";
import { url } from "../provider/apiInstance";

function SideMenu(props) {
    const isOpen = props.isOpen;
    const setIsOpen = props.setIsOpen;
    const activeTab = props.activeTab; // use prop, não estado interno
    const setActiveTab = props.setActiveTab;
    const [selectedChat, setSelectedChat] = useState(null);
    const [pendingChats, setPendingChats] = useState([]);

    useEffect(() => {
        if (props.selectedChat) setSelectedChat(props.selectedChat);
    }, [props.selectedChat]);

    useEffect(() => {
        if (isOpen && activeTab === "chats") {
            const userId = sessionStorage.getItem("userId");
            if (!userId) return;
            url.get(`/status/pending/ong/${userId}`)
                .then(res => {
                    setPendingChats(Array.isArray(res.data) ? res.data : []);
                })
                .catch(() => {
                    setPendingChats([]);
                    setSelectedChat({
                        petId: "",
                        ongNome: "",
                        petNome: "",
                        ongLink: ""
                    });
                });
        }
    }, [isOpen, activeTab]);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            {isOpen && <div className="sidebar-overlay" onClick={() => setIsOpen(false)} />}
            <div
                className={`sidebar-container ${isOpen ? "open" : ""}`}
                style={
                    activeTab === "liked"
                        ? { width: "490px" }
                        : undefined
                }
            >
                <div className="toggle-button" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? ">" : <><IoChatbubblesOutline /></>}
                </div>

                <div
                    className="sidebar-content"
                    style={
                        activeTab === "liked"
                            ? { width: "77rem" }
                            : undefined
                    }
                >
                    {activeTab === "chats" && (
                        <Chat
                            petId={selectedChat?.petId}
                            ongName={selectedChat?.ongNome}
                            petName={selectedChat?.petNome}
                            ongLink={selectedChat?.ongLink}
                        />
                    )}
                    <div className="menuContent">
                        <div className="menuButtons">
                            <button
                                className={`chatButton${activeTab === "chats" ? " ativo" : ""}`}
                                onClick={() => setActiveTab("chats")}
                            >
                                Chats
                            </button>
                            <button
                                className={`likedButton${activeTab === "liked" ? " ativo" : ""}`}
                                onClick={() => setActiveTab("liked")}
                            >
                                Curtidos
                            </button>
                        </div>
                        {activeTab === "chats" ? (
                            <ChatsArea
                                onSelectChat={setSelectedChat}
                                refreshKey={props.refreshKey}
                            />
                        ) : (
                            <LikedArea
                                onLikedPetClick={props.onLikedPetClick}
                                refreshKey={props.refreshKey}
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default SideMenu;