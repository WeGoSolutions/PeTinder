import "./components.css";
import { useNavigate } from "react-router-dom";
import Logo from "./Logo";

function NavBar(props) {

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
                {(props.showButtonIndex === 1 || props.showButtonIndex === undefined) && (
                    <button className="profileButton">
                        <img src="../../profile.svg" alt="" />
                    </button>
                )}
                {(props.showButtonIndex === 2 || props.showButtonIndex === undefined) && (
                    <button className="configButton">
                        <img src="../../config.svg" alt="" />
                    </button>
                )}
                {(props.showButtonIndex === 3 || props.showButtonIndex === undefined) && (
                    <button className="exitButton" onClick={sair}>
                        <img src="../../exit.svg" alt="" />
                    </button>
                )}
            </div>
        </div>
    )
}

export default NavBar;