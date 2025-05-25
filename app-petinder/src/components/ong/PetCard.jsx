import { CiImageOn } from "react-icons/ci";
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

function PetCard(props) {
    return (
        <div className="petCard">
            <div className="petImage">
                {props.src ? (
                    <img src={props.src} className="image" />
                ) : (
                    <CiImageOn className="placeholder" />
                )}
            </div>
            <div className="nameOptions">
                <span>{props.nomePet}</span>{/*tem q ver no back como q ta o nome*/}
                <div className="options">
                    <button className="edit"><MdModeEdit /></button>
                    <button className="delete"><MdDelete /> </button>
                </div>
            </div>
        </div>
    );
}

export default PetCard;
