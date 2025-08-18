import { CiImageOn } from "react-icons/ci";
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { IoMdMore } from "react-icons/io";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { url } from "../../provider/apiInstance";
import GenericModal from "../../components/GenericModal";
import Mensagens from "./Mensagens";
import SemMensagensdeInteressados from "./SemMensagensdeInteressados";

function PetCard(props) {
    const [showBaloon, setShowBaloon] = useState(false);
    const baloonRef = useRef(null);

    // Adicione os estados do modal
    const [showModal, setShowModal] = useState(false);
    const [modalStep, setModalStep] = useState(1);

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

    const [infosMensagens, setInfosMensagens] = useState([]);

    useEffect(() => {
        const ongId = sessionStorage.getItem("ongId");
        if (!ongId) return;

        url.get(`/ongs/${ongId}/mensagens-pendentes`)
            .then(response => {
                const dados = response.data;
                // Filtrar mensagens apenas para este pet específico
                const mensagensDoPet = Array.isArray(dados) 
                    ? dados.filter(msg => msg.nomePet === props.nome || msg.petNome === props.nome)
                    : [];
                setInfosMensagens(mensagensDoPet);
            })
            .catch(error => {
                console.error('Erro ao buscar mensagens:', error);
            });
    }, [props.nome]);

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const mensagemInteressados = "Ainda não temos nenhum interessado, mas não se preocupe, em pouco tempo irão aparecer!";

    return (
        <div className={`petCard${props.isAdopted ? " adopted" : ""}`}>
            {showModal && (
                <GenericModal
                    isOpen={showModal}
                    onClose={handleCloseModal}
                    title={`Usuários interessados no ${props.nome}:`}
                    width="600px"
                    // height="540px"
                >

                    <div className="interessados">
                        {infosMensagens.length === 0 ? (
                            <SemMensagensdeInteressados mensagem={mensagemInteressados} icon="normal" />
                        ) : (
                            <>
                                {infosMensagens.map((msg, idx) => (
                                    <Mensagens
                                        key={idx}
                                        nome={msg.nomeUser}
                                        imgSrc={msg.imageUrl || "/profile.svg"}
                                        hideIcon={true}
                                    />
                                ))}
                            </>
                        )}
                    </div>


                </GenericModal>
            )}
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
                                    onClick={() => setShowModal(true)}
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