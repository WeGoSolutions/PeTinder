import "./components.css";
import { useNavigate } from "react-router-dom";
import Logo from "./Logo";

function NavBarIndex() {
    const Navigate = useNavigate();
    const hasUser = !!sessionStorage.getItem("userId");

    return (
        <div className="navBar">
            <Logo color="#80465D" scale=".85" paddingBottom="0" />
            <div className="buttons">
                {hasUser ? (
                    <button onClick={() => Navigate("/initial")}>Acessar</button>
                ) : (
                    <>
                        <button onClick={() => Navigate("/login")}>Entrar</button>
                        <button onClick={() => Navigate("/cadastro")}>Crie sua conta</button>
                    </>
                )}
            </div>
        </div>
    )
}

export default NavBarIndex;