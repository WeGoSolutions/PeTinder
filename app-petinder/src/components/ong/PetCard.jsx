import { CiImageOn } from "react-icons/ci";
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

function PetCard(props) {
    return (
        <div className="petCard">
            <div style={{ width: props.size, height: props.size }}>
                {props.src ? (
                    <img src={props.src} className="image" />
                ) : (
                    <CiImageOn className="placeholder" />
                )}
            </div>
            <div>
                <span>{props.nomePet}</span>{/*tem q ver no back como q ta o nome*/}
                <button><MdModeEdit /></button>
                <button><MdDelete /> </button>
            </div>
        </div>
    );
}

export default PetCard;
