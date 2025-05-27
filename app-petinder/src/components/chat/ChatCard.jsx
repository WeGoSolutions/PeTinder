function ChatCard({ petNome, ongNome, descricao }) {
    return (
        <div className="chatCardContainer" tabIndex="0">
            <div className="cardLogoOng">
                <img src="/aumigos.svg" alt={petNome} />
            </div>
            <div className="cardTextsArea">
                <div className="cardTitle">
                    <h4>{petNome}</h4>
                    <img src="/bolinha.svg" alt="" />
                    <h4>{ongNome}</h4>
                </div>
                <div className="recentMessage">
                    {/* <p>{descricao}</p> */}
                </div>
            </div>
        </div>
    )
}

export default ChatCard;