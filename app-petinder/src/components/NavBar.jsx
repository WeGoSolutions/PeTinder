import "./components.css";
import { useNavigate } from "react-router-dom";

function PrimaryButton(props) {

    const Navigate = useNavigate();

    function sair() {
        localStorage.clear();
        Navigate("/login");
    }


    return (
        <div className="navContainer">
            <div className="logo" onClick={() => Navigate("/")}>
                <img src="../../Logo.svg" alt="" />
                <div className="title">
                    <p>PeTinder</p>
                </div>
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