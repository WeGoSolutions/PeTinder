import "./components.css";
import { useNavigate } from "react-router-dom";
import Logo from "./Logo";
import PerfilArea from "./PerfilArea";
import NotifyArea from "./NotifyArea";
import { useState } from "react";

function NavBar(props) {
    const Navigate = useNavigate();
    const [showPerfil, setShowPerfil] = useState(false);
    const [showNotify, setShowNotify] = useState(false);

    function sair() {
        sessionStorage.removeItem('authToken');
        sessionStorage.clear();
        Navigate("/login");
    }

    function config() {
        Navigate("/config");
    }

    const handleTogglePerfil = () => {
        setShowPerfil((prev) => !prev);
        setShowNotify(false);
    };

    const handleToggleNotify = () => {
        setShowNotify((prev) => !prev);
        setShowPerfil(false);
    };

    return (
        <div className="navContainer">
            <div onClick={() => Navigate("/")} style={{ cursor: "pointer" }}>
                <Logo paddingBottom="0" scale=".85" />
            </div>
            <div className="navActions">
                {(props.showButtonIndex === 1 || props.showButtonIndex === undefined) && (
                    <button
                        className="notifyButton"
                        onClick={handleToggleNotify}
                    >
                        <img src="../../notifyIcon.svg" alt="" />
                    </button>
                )}
                {(props.showButtonIndex === 2 || props.showButtonIndex === undefined) && (
                    <button
                        className="profileButton"
                        onClick={handleTogglePerfil}
                    >
                        <img src="../../profile.svg" alt="" />
                    </button>
                )}
                {(props.showButtonIndex === 3 || props.showButtonIndex === undefined) && (
                    <button className="configButton" onClick={config}>
                        <img src="../../config.svg" alt="" />
                    </button>
                )}
                {(props.showButtonIndex === 4 || props.showButtonIndex === undefined) && (
                    <button className="exitButton" onClick={sair}>
                        <img src="../../exit.svg" alt="" />
                    </button>
                )}
            </div>
            {showPerfil && (
                <div className="perfilAreaModal" onClick={() => setShowPerfil(false)}>
                    <div onClick={e => e.stopPropagation()}>
                        <PerfilArea />
                    </div>
                </div>
            )}
            {showNotify && (
                <div className="notifyAreaModal" onClick={() => setShowNotify(false)}>
                    <div onClick={e => e.stopPropagation()}>
                        <NotifyArea />
                    </div>
                </div>
            )}
        </div>
    )
}

export default NavBar;