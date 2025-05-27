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
                <span>{props.nome}</span>
                <div className="options">
                    <button className="edit" onClick={props.onEdit}><MdModeEdit /></button>
                    <button className="delete" onClick={props.onDelete}><MdDelete /> </button>
                </div>
            </div>
        </div>
    );
}

export default PetCard;
