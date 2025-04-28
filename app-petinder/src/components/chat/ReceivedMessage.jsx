function ReceivedMessage(props) {
    return (
        <div className="msgAreaR">
            <div className="receivedMessage">
                <p>{props.message}</p>
            </div>
        </div>
    )
}

export default ReceivedMessage; 