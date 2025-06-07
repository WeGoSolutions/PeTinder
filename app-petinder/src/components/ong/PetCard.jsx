import { CiImageOn } from "react-icons/ci";
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { IoMdMore } from "react-icons/io";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { url } from "../../provider/apiInstance";

function PetCard(props) {
    const [showBaloon, setShowBaloon] = useState(false);
    const baloonRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (baloonRef.current && !baloonRef.current.contains(event.target)) {
                setShowBaloon(false);
            }
        }
        if (showBaloon) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showBaloon]);

    const marcarComoAdotado = async () => {
        try {
            await url.post(`/status/adopted/${props.id}/1`);
            window.location.reload();
        } catch (err) {
            alert("Erro ao marcar como adotado");
        }
    };

    const voltarParaAdocao = async () => {
        try {
            await url.delete(`/status/${props.id}/1`);
            window.location.reload();
        } catch (err) {
            alert("Erro ao voltar para adoção");
        }
    };

    return (
        <div className={`petCard${props.isAdopted ? " adopted" : ""}`}>
            <div className="petImage">
                {props.src ? (
                    <img src={props.src} className="image" />
                ) : (
                    <CiImageOn className="placeholder" />
                )}
                <IoMdMore
                    color="white"
                    size={25}
                    className="menu3p"
                    onClick={() => setShowBaloon((prev) => !prev)}
                />
                {showBaloon && (
                    <div className="baloonPet" ref={baloonRef}>
                        {props.isAdopted ? (
                            <p
                                className="baloonText adopted"
                                onClick={() => voltarParaAdocao()}
                            >
                                Voltar para a Adoção
                            </p>
                        ) : (
                            <>
                                <p className="baloonText notAdopted"
                                    onClick={() => marcarComoAdotado()}
                                >
                                    Adotado pelo PeTinder
                                </p>
                                <p className="baloonText notAdopted"
                                    onClick={() => marcarComoAdotado()}
                                >
                                    Adotado por outra plataforma
                                </p>
                            </>
                        )}
                    </div>
                )}
            </div>
            <div className="nameOptions">
                <span title={props.nome}>{props.nome}</span>
                <div className="options">
                    <button className="edit" onClick={props.onEdit}><MdModeEdit color="white" /></button>
                    <button className="delete" onClick={props.onDelete}><MdDelete color="white" /> </button>
                </div>
            </div>
        </div>
    );
}

export default PetCard;
