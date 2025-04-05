import "./components.css";
import { useNavigate } from "react-router-dom";

function NavBar() {
    const Navigate = useNavigate();
    return (
        <div className="navBar">
            <div className="logo">
                <img src="./Logo.svg" alt="" />
                <span>PeTinder</span>
            </div>
            <div className="buttons">
                <button onClick={() => Navigate("/login")}>Entrar</button>
                <button onClick={() => Navigate("/cadastro")}>Crie sua conta</button>
            </div>
        </div>
    )
}

export default NavBar;