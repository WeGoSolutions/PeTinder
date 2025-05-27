import { useEffect, useRef } from "react";
import ChatFooter from "./ChatFooter";
import ChatHeader from "./ChatHeader";
import ReceivedMessage from "./ReceivedMessage";
import SentMessage from "./SentMessage";
import HiperLink from "../HiperLink";

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
        <ChatHeader ongName={props.ongName} petName={props.petName} />
        <div className="chatMessagesNoChat">
            <img src="./aumigosDoBem.svg" alt="" />
            <div className="chatMessagesNoChatText">
                {(!props.ongName && !props.petName && !props.ongLink) ? (
                    <p>Opss, parece que você não tem chat ainda.</p>
                ) : (
                    <p>
                        Ficamos muito felizes pela sua decisão!&nbsp;
                        <HiperLink
                            label="Clique aqui"
                            href={props.ongLink}
                            haveDecoration={true}
                            target="_blank"
                            rel="noopener noreferrer"
                        />
                        &nbsp;para entrar em contato com a ONG referente ao Pet desejado ❤️
                    </p>
                )}
            </div>
        </div>

            {/* <div className="chatMessages">
                <SentMessage message="Olá" />
                <SentMessage message="Vou querer adotar esse bichoaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" />
                <ReceivedMessage message="Oi, tudo bem?" />
                <ReceivedMessage message="Vou criar o formulario" />
                <div ref={chatEndRef} />
            </div> */}
            <ChatFooter />
        </div>
    );
}

export default Chat;