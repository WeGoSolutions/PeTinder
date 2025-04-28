function ChatHeader(props) {

    return (
        <div className="chatHeader">
            <div className="ongLogo">
                <img src="../../aumigos.svg" alt="" />
            </div>
            <div className="chatTitle">
                <div className="ongName">
                    <h2>AUmigos do Bem</h2>
                </div>
                <img src="../../bolinha.svg" alt="" />
                <div className="petName">
                    <h2>Kenny</h2>
                </div>
            </div>
        </div>
    )
}

export default ChatHeader;