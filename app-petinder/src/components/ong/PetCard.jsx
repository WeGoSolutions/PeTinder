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

        // Novo estado para controlar o modal de adotante
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
        try {
            console.log('marcarComoAdotado chamado com idAdotante:', idAdotante);
            await url.post(`/status/adopted/${props.id}/${idAdotante}`);
            setAdotanteId(idAdotante);
            window.location.reload();
        } catch (err) {
            alert("Erro ao marcar como adotado");
        }
    };

    const voltarParaAdocao = async (idAdotante) => {
        try {
            await url.delete(`/status/${props.id}/5b42a85b-ff66-45c8-ab46-8d27e1f4578f`);   //ESSE ID AQUI - FAZER UM ROOT - marcarComoAdotado chamado com idAdotante: 5b42a85b-ff66-45c8-ab46-8d27e1f4578f
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
                console.log('Mensagens recebidas:', dados);

                // Salvar em variáveis os campos desejados
                const mensagensDoPet = Array.isArray(dados)
                    ? dados
                        .filter(msg => msg.nomePet === props.nome || msg.petNome === props.nome)
                        .map(msg => {
                            const idOng = msg.idOng;
                            const idUser = msg.idUser;
                            const idPet = msg.idPet;
                            const nomeUser = msg.nomeUser;
                            const nomePet = msg.nomePet || msg.petNome;
                            return { ...msg, idOng, idUser, idPet, nomeUser, nomePet };
                        })
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

    // Abrir modal e buscar dados do adotante
    const handleShowAdotanteModal = async () => {
        await fetchAdotanteInfo();
        setShowAdotanteModal(true);
    };

    // Função para buscar dados do adotante
    const fetchAdotanteInfo = async () => {
        console.log(`Buscando informações do adotante com ID: ${props.id}`);
        try {
            const res = await url.get(`/status/adopted/${props.id}`);
            console.log('Resposta completa do servidor:', res);
            console.log('Itens retornados:', res.data);
            setAdotanteInfo(res.data);
        } catch (err) {
            setAdotanteInfo(null);
        }
    };

    return (
        <div className={`petCard${props.isAdopted ? " adopted" : ""}`}>
            {showModal && (
                <GenericModal
                    isOpen={showModal}
                    onClose={handleCloseModal}
                    title={`Usuários interessados no ${props.nome}:`}
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
                                            setAdotanteId(msg.idUser);
                                            console.log('Adotante ID:', msg.idUser);
                                            setShowModal(false);

                                            // já chama marcarComoAdotado passando o idUser
                                            await marcarComoAdotado(msg.idUser);
                                        }}
                                        nome={`${msg.nomeUser} (ID: ${msg.idUser})`}
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
                                src={adotanteInfo.imageUrl || "/profile.svg"}
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
                                    onClick={() => voltarParaAdocao(adotanteInfo?.idUsuario)}
                                >
                                    Voltar para a Adoção
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