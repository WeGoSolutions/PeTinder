import { IoSettingsOutline } from "react-icons/io5";
import { GoShieldCheck } from "react-icons/go";
import { VscAccount } from "react-icons/vsc";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const iconMap = {
    Config: IoSettingsOutline
};

export default function SideButtonsConfig({ nameButton, icon, path, sidePanelOpen }) {
    const navigate = useNavigate();
    const location = useLocation();
    const [hovered, setHovered] = useState(false);
    const [derivedHovered, setDerivedHovered] = useState(false);
    const [derivedClicked, setDerivedClicked] = useState(false);

    const isActive =
        location.pathname === path ||
        location.pathname === "/ong/configuracao/seguranca" ||
        location.pathname === "/ong/configuracao" ||
        hovered ||
        derivedHovered;

    const IconComponent = iconMap[icon];

    const handleSegurancaClick = (e) => {
        e.stopPropagation();
        setDerivedClicked(true);
        navigate("/ong/configuracao/seguranca");
    };

    const handleContaClick = (e) => {
        e.stopPropagation();
        setDerivedClicked(true);
        navigate("/ong/configuracao");
    };

    useEffect(() => {
        if (
            location.pathname !== "/ong/configuracao" &&
            location.pathname !== "/ong/configuracao/seguranca"
        ) {
            setDerivedClicked(false);
        }
    }, [location.pathname]);

    const showDerivedButtons =
    hovered || derivedClicked ||
    location.pathname === "/ong/configuracao" ||
    location.pathname === "/ong/configuracao/seguranca";

    const isSegurancaActive = location.pathname === "/ong/configuracao/seguranca";
    const isContaActive = location.pathname === "/ong/configuracao";

    return (
        <div
            style={{ position: "relative", width: "100%" }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <div>
                {showDerivedButtons && (
                    <>
                        <div
                            className={`aboveButtonDiv${derivedHovered === 'seguranca' || isSegurancaActive ? ' derived-hovered' : ''}`}
                            onClick={handleSegurancaClick}
                            onMouseEnter={() => setDerivedHovered('seguranca')}
                            onMouseLeave={() => setDerivedHovered(false)}
                            style={{ borderRadius: "15px 15px 0 0" }}
                        >
                            <GoShieldCheck size={24} className="iconFixed" />
                            <span className={sidePanelOpen ? "span-hidden" : "span-visible"}>
                                Segurança
                            </span>
                        </div>

                        <div
                            className={`aboveButtonDiv${derivedHovered === 'conta' || isContaActive ? ' derived-hovered' : ''}`}
                            onClick={handleContaClick}
                            onMouseEnter={() => setDerivedHovered('conta')}
                            onMouseLeave={() => setDerivedHovered(false)}
                        >
                            <VscAccount size={24} className="iconFixed" />
                            <span className={sidePanelOpen ? "span-hidden" : "span-visible"}>
                                Conta
                            </span>
                        </div>
                    </>
                )}
            </div>

            <div
                className={`buttonsContainer${isActive ? " activeButton" : ""} no-rounded`}
            >
                {IconComponent && <IconComponent size={24} className="iconFixed" />}
                <span className="test">{nameButton}</span>
            </div>
        </div>
    );
}