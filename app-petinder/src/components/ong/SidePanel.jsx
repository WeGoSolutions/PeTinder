import { useState } from "react";
import "../components.css";
import { IoIosMenu } from "react-icons/io";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import SideButtons from "./SideButtons";
import SideButtonsConfig from "./SideButtonsConfig";
import { useEffect} from "react";
import UserImage from "../UserImage";
import { url } from "../../provider/apiInstance";
import reqs from "../../reqs";

export default function SidePanel() {
    const [open, setOpen] = useState(false);

    const [ongNome, setOngNome] = useState("Undefined");
    const [urlImage, setUrlImage] = useState("");

    useEffect(() => {
        const sessionName = sessionStorage.getItem("userName");
        setOngNome(sessionName || "Undefined");
    }, []);

      useEffect(() => {
             const ongId = sessionStorage.getItem("ongId");
             if (!ongId) return;

             const fetchOngImage = async () => {
                 const result = await reqs.getOngImageSidePanel(ongId);
                 if (result.success) {
                     setUrlImage(result.imageUrl);
                 }
             };

             fetchOngImage();
         }, [])

    return (
        <aside className={`sidePanel ${open ? "closedPanel" : ""} `}>

            <div className="ongInfos">
                <UserImage size={100} hasEdit={false} src={urlImage}/>
                {/* <img src="/aumigosLogo.svg" alt="Logo da ONG Aumigos Do Bem" /> */}
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