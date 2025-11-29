import { CiImageOn } from "react-icons/ci";
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { IoMdMore } from "react-icons/io";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { url } from "../../provider/apiInstance";
import reqs from "../../reqs";
import GenericModal from "../../components/GenericModal";
import Mensagens from "./Mensagens";
import SemMensagensdeInteressados from "./SemMensagensdeInteressados";

function PetCard(props) {
    const [showBaloon, setShowBaloon] = useState(false);
    const baloonRef = useRef(null);
    const [showModal, setShowModal] = useState(false);
    const [modalStep, setModalStep] = useState(1);
    const [showAdotanteModal, setShowAdotanteModal] = useState(false);
    const [adotanteInfo, setAdotanteInfo] = useState(null);
    const [adotanteId, setAdotanteId] = useState(3);

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

    const marcarComoAdotado = async (idAdotante) => {
        const result = await reqs.marcarPetComoAdotado(props.id, idAdotante);
        if (result.success) {
            setAdotanteId(idAdotante);
            window.location.reload();
        } else {
            console.error("Erro ao marcar como adotado:", result.error);
        }
    };

    const idAdotanteRoot = "11111111-1111-1111-1111-111111111111";

    const marcarComoAdotadoExterno = async () => {
        const result = await reqs.marcarComoAdotadoExterno(props.id);
        if (result.success) {
            window.location.reload();
        } else {
            console.error("Erro ao marcar como adotado:", result.error);
        }
    }

    const handleVoltarParaAdocao = async () => {
        await fetchAdotanteInfo(); // garante que adotanteInfo está carregado
        voltarParaAdocao();
    };

    const voltarParaAdocao = async () => {
        const adotanteIdToDelete = adotanteInfo?.userId || idAdotanteRoot;
        const result = await reqs.voltarParaAdocao(props.id, adotanteIdToDelete);
        if (result.success) {
            window.location.reload();
        } else {
            console.error("Erro ao voltar para adoção:", result.error);
        }
    };

    const [infosMensagens, setInfosMensagens] = useState([]);

    useEffect(() => {
        const ongId = sessionStorage.getItem("ongId");
        if (!ongId) return;

        const fetchMensagens = async () => {
            const result = await reqs.getMensagensPendentesPetCard(ongId, props.nome);
            if (result.success) {
                setInfosMensagens(result.data);
            } else {
                console.error('Erro ao buscar mensagens:', result.error);
            }
        };

        fetchMensagens();
    }, [props.nome]);

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const mensagemInteressados = "Ainda não temos nenhum interessado, mas não se preocupe, em pouco tempo irão aparecer!";

    const handleShowAdotanteModal = async () => {
        await fetchAdotanteInfo();
        setShowAdotanteModal(true);
    };

    const fetchAdotanteInfo = async () => {
        const result = await reqs.fetchAdotanteInfoPetCard(props.id);
        if (result.success) {
            setAdotanteInfo(result.data);
        } else {
            setAdotanteInfo(null);
        }
    };

    return (
        <div className={`petCard${props.isAdopted ? " adopted" : ""}`}>
            {showModal && (
                <GenericModal
                    isOpen={showModal}
                    onClose={handleCloseModal}
                    title={`Usuários interessados no(a) ${props.nome}:`}
                    width="600px"
                >
                    <div className="interessados">
                        {infosMensagens.length === 0 ? (
                            <SemMensagensdeInteressados mensagem={mensagemInteressados} icon="normal" />
                        ) : (
                            <div>
                                {infosMensagens.map((msg, idx) => (
                                    <Mensagens
                                        key={idx}
                                        onClick={async () => {
                                            setAdotanteId(msg.userId);
                                            setShowModal(false);
                                            await marcarComoAdotado(msg.userId);
                                        }}
                                        nome={`${msg.userName}`}
                                        imgSrc={msg.imageUrl || "/profile.svg"}
                                        hideIcon={true}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </GenericModal>
            )}

            {showAdotanteModal && (
                <GenericModal
                    isOpen={showAdotanteModal}
                    onClose={() => setShowAdotanteModal(false)}
                    title={`Adotante do(a) ${props.nome}:`}
                    width="400px"
                    height="300px"
                >
                    {adotanteInfo ? (
                        <div className="adotante-info">
                            <img
                                src={adotanteInfo.imagemUrl || "/profile.svg"}
                                style={{ width: 80, height: 80, borderRadius: "50%" }}
                            />
                            <h3>{`${adotanteInfo.nomeUsuario}`}</h3>
                            <p>Email: {adotanteInfo.email}</p>
                        </div>
                    ) : (
                        <p>Nenhum adotante encontrado para este pet.</p>
                    )}
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
                            <>
                                <p
                                    className="baloonText adopted"
                                    onClick={handleVoltarParaAdocao}
                                >
                                    Voltar para adoção
                                </p>
                                <p
                                    className="baloonText adopted"
                                    onClick={handleShowAdotanteModal}
                                >
                                    Ver adotante
                                </p>
                            </>
                        ) : (
                            <>
                                <p className="baloonText notAdopted"
                                    onClick={() => setShowModal(true)}
                                >
                                    Adotado pelo PeTinder
                                </p>
                                <p className="baloonText notAdopted"
                                    onClick={() => marcarComoAdotadoExterno()}
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