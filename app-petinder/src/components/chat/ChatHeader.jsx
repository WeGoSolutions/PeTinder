function ChatHeader(props) {
    const titleTooltip = `${props.petName} • ${props.ongName}`

    return (
        <div className="chatHeader" title={titleTooltip}>
            <div className="ongLogo">
                <img src="../../aumigos.svg" alt="" />
            </div>
            <div className="chatTitle">
                <div className="petName">
                    <h2>{props.petName}</h2>
                </div>
                {props.petName && props.ongName && (
                    <img src="../../bolinha.svg" alt="" />
                )}
                <div className="ongName">
                    <h2>{props.ongName}</h2>
                </div>
            </div>
        </div>
    )
}
export default ChatHeader;