
function ChatCard(props) {
    return (
        <div className="chatCardContainer" tabindex="0">
            <div className="cardLogoOng">
                <img src="../../aumigos.svg" alt="" />
            </div>
            <div className="cardTextsArea">
                <div className="cardTitle">
                    <h4>Kenny</h4>
                    <img src="../../bolinha.svg" alt="" />
                    <h4>AUmigos do Bem</h4>
                </div>
                <div className="recentMessage">
                    <p>Vou criar o formulario</p>
                </div>
            </div>
        </div>
    )
}

export default ChatCard;