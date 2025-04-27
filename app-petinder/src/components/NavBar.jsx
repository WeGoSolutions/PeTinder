import "./components.css";
import { useNavigate } from "react-router-dom";
import Logo from "./Logo";

function PrimaryButton(props) {

    const Navigate = useNavigate();

    function sair() {
        sessionStorage.removeItem('authToken');
        sessionStorage.clear();
        Navigate("/login");
    }


    return (
        <div className="navContainer">
            <div onClick={() => Navigate("/")} style={{ cursor: "pointer" }}>
                <Logo paddingBottom="0" scale=".85"/>  
            </div>
            <div className="navActions">
                <button className="profileButton">
                    <img src="../../profile.svg" alt="" />
                </button>
                <button className="configButton">
                <img src="../../config.svg" alt="" />

                </button>
                <button className="exitButton" onClick={sair}>
                <img src="../../exit.svg" alt="" />
                </button>
            </div>
        </div>
    )
}

export default PrimaryButton;