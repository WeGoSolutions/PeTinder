import "./components.css";
import { useNavigate } from "react-router-dom";
import Logo from "./Logo";

function NavBarIndex() {
    const Navigate = useNavigate();
    return (
        <div className="navBar">
            <Logo color="#80465D" scale= ".85" paddingBottom="0"/>
            <div className="buttons">
                <button onClick={() => Navigate("/login")}>Entrar</button>
                <button onClick={() => Navigate("/cadastro")}>Crie sua conta</button>
            </div>
        </div>
    )
}

export default NavBarIndex;