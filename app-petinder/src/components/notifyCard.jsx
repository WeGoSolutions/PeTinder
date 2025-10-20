import UserImage from "./UserImage";
import SecondaryButton from "./SecondaryButton";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { url } from "../provider/apiInstance";
import { MdDelete } from "react-icons/md";

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

    const handleDelete = (e) => {
        e.stopPropagation();
        if (props.onDelete) {
            props.onDelete();
        }
    };

    return (
        <div
            className={`notifyCard-area ${props.viewed ? 'viewed' : 'new'}`}
            style={{ cursor: 'pointer' }}
        >
            <div className="notifyCardContainer">
                <div className="notifyIcon">
                    <img src={notifyIcon} alt="Notification icon" />
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
                <div className="options">
                    <button className="delete" onClick={handleDelete}>
                        <MdDelete color="black" />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default NotifyCard;