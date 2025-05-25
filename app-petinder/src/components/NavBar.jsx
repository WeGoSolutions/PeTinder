import "./components.css";
import { useNavigate } from "react-router-dom";
import Logo from "./Logo";
import PerfilArea from "./PerfilArea";
import { useState } from "react";

function NavBar(props) {
    const Navigate = useNavigate();
    const [showPerfil, setShowPerfil] = useState(false);

    function sair() {
        sessionStorage.removeItem('authToken');
        sessionStorage.clear();
        Navigate("/login");
    }

    function config() {
        Navigate("/config");
    }

    return (
        <div className="navContainer">
            <div onClick={() => Navigate("/")} style={{ cursor: "pointer" }}>
                <Logo paddingBottom="0" scale=".85" />
            </div>
            <div className="navActions">
                {(props.showButtonIndex === 1 || props.showButtonIndex === undefined) && (
                    <button
                        className="profileButton"
                        onClick={() => setShowPerfil((prev) => !prev)} // Alterna entre abrir e fechar
                    >
                        <img src="../../profile.svg" alt="" />
                    </button>
                )}
                {(props.showButtonIndex === 2 || props.showButtonIndex === undefined) && (
                    <button className="configButton" onClick={config}>
                        <img src="../../config.svg" alt="" />
                    </button>
                )}
                {(props.showButtonIndex === 3 || props.showButtonIndex === undefined) && (
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
        </div>
    )
}

export default NavBar;