import { useEffect, useRef, useState } from "react";
import ChatFooter from "./ChatFooter";
import ChatHeader from "./ChatHeader";
import ReceivedMessage from "./ReceivedMessage";
import SentMessage from "./SentMessage";
import HiperLink from "../HiperLink";
import { CgProfile } from "react-icons/cg";
import reqs from "../../reqs";

function Chat(props) {
    const chatEndRef = useRef(null);

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const [urlImage, setUrlImage] = useState("");

    useEffect(() => {
        scrollToBottom();
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [props.messages]);

    useEffect(() => {
        if (!props.ongId) return;
        
        const fetchOngImage = async () => {
            const result = await reqs.getOngImageForChat(props.ongId);
            setUrlImage(result.imageUrl);
        };
        
        fetchOngImage();
    }, [props.ongId]);

    return (
        <div className="chat">
            <ChatHeader 
                urlImage={urlImage} 
                ongName={props.ongName} 
                petName={props.petName} 
                petId={props.petId} 
                onPendingPetClick={props.onPendingPetClick}
            />
            <div className="chatMessagesNoChat">
                <div className="chatMessagesNoChatContainer">
                    {urlImage ? (
                        <img src={urlImage} alt="" />
                    ) : (
                        <CgProfile size={250} />
                    )}
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
            </div>

            {/* <div className="chatMessages">
                <SentMessage message="Olá" />
                <SentMessage message="Vou querer adotar esse bichoaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" />
                <ReceivedMessage message="Oi, tudo bem?" />
                <ReceivedMessage message="Vou criar o formulario" />
                <div ref={chatEndRef} />
            </div> */}
            <ChatFooter petId={props.petId} />
        </div>
    );
}

export default Chat;