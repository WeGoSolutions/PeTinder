import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineSecurity } from "react-icons/md";
import { GoShieldCheck } from "react-icons/go";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

const iconMap = {
    Config: IoSettingsOutline
};

export default function SideButtonsConfig({ nameButton, icon, path, sidePanelOpen }) {
    const navigate = useNavigate();
    const location = useLocation();
    const [hovered, setHovered] = useState(false);

    // Ativo se for a rota do botão OU a rota de segurança
    const isActive = location.pathname === path || location.pathname === "/ong/configuracao/seguranca";
    const IconComponent = iconMap[icon];

    // Segurança visível se o botão estiver ativo
    const showSeguranca = isActive;

    const handleSegurancaClick = (e) => {
        e.stopPropagation();
        navigate("/ong/configuracao/seguranca");
    };

    return (
        <div
            style={{ position: "relative", width: "100%" }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {showSeguranca && (
                <div
                    className={`aboveButtonDiv${location.pathname === "/ong/configuracao/seguranca" ? " activeButton" : ""}`}
                    onClick={handleSegurancaClick}
                    style={sidePanelOpen ? { bottom: "37px", height: "40px" } : { bottom: "54px" }}
                >
                    <GoShieldCheck size={24} className="iconFixed" />
                    <span className={sidePanelOpen ? "span-hidden" : "span-visible"}>
                        Segurança
                    </span>
                </div>
            )}
            <div
                className={`buttonsContainer${isActive ? " activeButton" : ""}`}
                onClick={() => navigate(path)}
            // style={{ background: "#FADAE7" }}
            >
                {IconComponent && <IconComponent size={24} className="iconFixed" />}
                <span className="test">{nameButton}</span>
            </div>
        </div>
    );
}
