import UserImage from "./UserImage";
import SecondaryButton from "./SecondaryButton";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { url } from "../provider/apiInstance";

function NotifyCard(props) {
    const Navigate = useNavigate();
    const name = sessionStorage.userName;
    const userId = sessionStorage.getItem("userId");
    const [notifyIcon, setNotifyIcon] = useState("");

    useEffect(() => {
        if (props.notifyType === "ADOPTED") {
            setNotifyIcon("./adopted.svg");
        } else if (props.notifyType === "NOTADOPTED" || props.notifyType === "OTHERS") {
            setNotifyIcon("./others.svg");
        }
    }, [props.notifyType]);
    
    useEffect(() => {

    }, [userId]);

    return (
        <div className="notifyCard-area">
            <div className="notifyCardContainer">
                <div className="notifyIcon">
                    <img src={notifyIcon} />
                </div>
                <div className="notifyCardAreaContainer">
                    <div className="notifyCardAreaTitle">
                        <p>
                            {props.title}
                        </p>
                    </div>
                    <div className="notifyCardAreaDescription">
                        <p>
                            {props.description}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NotifyCard;