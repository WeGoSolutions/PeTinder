import { useEffect, useRef } from "react";
import ChatFooter from "./ChatFooter";
import ChatHeader from "./ChatHeader";
import ReceivedMessage from "./ReceivedMessage";
import SentMessage from "./SentMessage";

function Chat(props) {
    const chatEndRef = useRef(null);

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [props.messages]);

    return (
        <div className="chat">
            <ChatHeader />
            <div className="chatMessages">
                <SentMessage message="Olá" />
                <SentMessage message="Vou querer adotar esse bichoaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" />
                <ReceivedMessage message="Oi, tudo bem?" />
                <ReceivedMessage message="Vou criar o formulario" />
                <div ref={chatEndRef} />
            </div>
            <ChatFooter />
        </div>
    );
}

export default Chat;