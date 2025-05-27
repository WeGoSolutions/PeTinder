import React, { useState } from "react";
import "./components.css";
import Chat from "./chat/Chat";
import ChatsArea from "./chat/ChatsArea";
import LikedArea from "./LikedArea.jsx"; // Importe o componente LikedArea
import { IoChatbubblesOutline } from "react-icons/io5";

function SideMenu(props) {
    const isOpen = props.isOpen;
    const setIsOpen = props.setIsOpen;

    const [activeTab, setActiveTab] = useState("chats"); // "chats" ou "liked"

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            {isOpen && <div className="sidebar-overlay" onClick={toggleSidebar} />}
            <div
                className={`sidebar-container ${isOpen ? "open" : ""}`}
                style={
                    activeTab === "liked"
                        ? { width: "490px" }
                        : undefined
                }
            >
                <div className="toggle-button" onClick={toggleSidebar}>
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
                    {activeTab === "chats" && <Chat />}
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
                        {activeTab === "chats" ? <ChatsArea /> : <LikedArea onLikedPetClick={props.onLikedPetClick} />}
                    </div>
                </div>
            </div>
        </>
    );
}

export default SideMenu;