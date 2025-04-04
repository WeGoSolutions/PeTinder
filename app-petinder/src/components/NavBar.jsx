import "./components.css";

function PrimaryButton(props) {

    function sair() {
        localStorage.clear();
        window.location.href = "/login";
    }


    return (
        <div className="navContainer">
            <div className="logo">
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