
function ChatFooter(props) {
    return (
        <div className="chatFooter">
            <div className="chatInput">
                <input type="text" />
            </div>
            <div className="chatFooterButtons">
                <button>
                    <img src="../../enviar.svg" alt="" />
                </button>
            </div>
        </div>
    )
}

export default ChatFooter;