import { useState } from "react";
import "../components.css";
import { IoIosMenu } from "react-icons/io";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import SideButtons from "./SideButtons";
import SideButtonsConfig from "./SideButtonsConfig";
import { useEffect} from "react";

export default function SidePanel() {
    const [open, setOpen] = useState(false);

    const [ongNome, setOngNome] = useState("Undefined");

    useEffect(() => {
        const sessionName = sessionStorage.getItem("userName");
        setOngNome(sessionName || "Undefined");
    }, []);

    return (
        <aside className={`sidePanel ${open ? "closedPanel" : ""} `}>

            <div className="ongInfos">
                <img src="/aumigosLogo.svg" alt="Logo da ONG Aumigos Do Bem" />
                <span>{ongNome}</span>
            </div>

            {!open && <div className="line"></div>}

            <div className="sideButtons">
                <SideButtons nameButton="Home" icon="Home" path="/ong/home" />
                <SideButtons nameButton="Interessados" icon="Interessados" path="/ong/interessados" />
                <SideButtons nameButton="Dashboard" icon="Dash" path="/ong/dashboard" />
                <SideButtons nameButton="Pets" icon="Pets" path="/ong/pets" />

                <div className="configButton">
                    <SideButtonsConfig nameButton="Configurações" icon="Config" path="/ong/configuracao" sidePanelOpen={open} />
                </div>
            </div>

            <button onClick={() => setOpen(!open)} className="burgButton">
                <MdOutlineKeyboardDoubleArrowRight size={22} className={`menuIcon ${open ? "rotate" : ""}`} />
            </button>
        </aside>
    );
};

{/* SE QUISER O HOVER NO PAINEL
    <aside
            className={`sidePanel ${open ? "" : "closedPanel"}`}
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
        >
            <div className="ongInfos">
                <img src="/aumigosLogo.svg" alt="Logo da ONG Aumigos Do Bem" />
                <span>AUmigos do bem</span>
            </div>
*/}