import React, { useState } from "react";
import "./components.css";
import Chat from "./chat/Chat";
import ChatsArea from "./chat/ChatsArea";
import { IoChatbubblesOutline } from "react-icons/io5";

function SideMenu(props) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            {/* Overlay escuro */}
            {isOpen && <div className="sidebar-overlay" onClick={toggleSidebar} />}

            <div className={`sidebar-container ${isOpen ? "open" : ""}`}>
                <div className="toggle-button" onClick={toggleSidebar}>
                    {isOpen ? ">" : <><IoChatbubblesOutline />
                    </>}
                </div>

                <div className="sidebar-content">
                    <Chat />
                    <div className="menuContent">
                        <div className="menuButtons">
                            <button className="chatButton">
                                Chats
                            </button>

                            <button className="likedButton">
                                Curtidos
                            </button>
                        </div>
                        <ChatsArea />
                    </div>
                </div>
            </div>
        </>
    );
}

export default SideMenu;
