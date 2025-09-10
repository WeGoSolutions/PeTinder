import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar";
import PetActions from "../../components/PetActions";
import PetInfo from "../../components/PetInfo";
import SideMenu from "../../components/SideMenu";
import GenericModal from "../../components/GenericModal";
import styles from './initial.module.css';
import FormInput from "../../components/FormInput";
import HiperLink from "../../components/HiperLink";
import PrimaryButton from "../../components/PrimaryButton";
import DropDown from "../../components/DropDown";
import NotFoundPets from "../../components/exceptions/NotFoundPets";
import { formatarCEP, capitalizar, formatarCPF } from "../../utils/utils";
import { url } from "../../provider/apiInstance"; // Certifique-se de importar a instância axios
import ImageInput from "../../components/ImageInput";
import Reqs from "../../reqs";
import { convertImagesToBase64 } from "../../utils/utils"; // ajuste o caminho se necessário
import Strings from "../../utils/strings"

function Initial() {
    const Navigate = useNavigate();
    const [formValues, setFormValues] = useState({
        cpf: "",
        cep: "",
        rua: "",
        complemento: "",
        numero: "",
        cidade: "",
        uf: ""
    });
    const ufs = ["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"];
    const [showModal, setShowModal] = useState(false);
    const [modalStep, setModalStep] = useState(1); // 1: primeiro modal, 2: segundo modal
    const [profileImage, setProfileImage] = useState(null); // File
    const [profileImageBase64, setProfileImageBase64] = useState(""); // string
    const userName = sessionStorage.getItem("userName") || "";
    const firstName = userName.split(" ")[0];
    const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
    const handleOpenSideMenu = () => setIsSideMenuOpen(true);
    const [sideMenuTab, setSideMenuTab] = useState("chats");
    const [selectedChat, setSelectedChat] = useState(null);
    const [userEndereco, setUserEndereco] = useState(null);
    const [notFound, setNotFound] = useState(false);

    const handleProfileImageChange = async (file) => {
        setProfileImage(file);
        if (file) {
            const [base64] = await convertImagesToBase64([file]);
            setProfileImageBase64(base64);
        } else {
            setProfileImageBase64("");
        }
    };

    const openModal = () => {
        setShowModal(true);
        setModalStep(1);
    };

    const signImage = async () => {
        if (!profileImage) {
            return;
        }

        const userId = sessionStorage.getItem("userId");
        const authToken = sessionStorage.getItem("authToken");

        try {
            const [base64Image] = await convertImagesToBase64([profileImage]);
            await url.post(`/users/${userId}/imagem`, {
                imagemUsuario: base64Image
            }, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${authToken}`,
                },
            });
            setModalStep(2);
        } catch (error) {
            console.error(error);
        }
    };

    const handleNextModal = () => {
        setModalStep(2);
    };

    const handleCloseModalAndReset = async () => {
        setShowModal(false);
        setModalStep(1);
        await Reqs.handleCloseModal();
    };

    useEffect(() => {
        const userId = sessionStorage.getItem("userId");
        if (!userId) return;
        url.get(`/users/${userId}`)
            .then(response => {
                const data = response.data;
                if (data.cep) {
                    setUserEndereco({
                        cep: data.cep,
                        rua: data.rua,
                        numero: data.numero,
                        cidade: data.cidade,
                        uf: data.uf,
                        complemento: data.complemento,
                    });
                }
            })
            .catch(error => {
                console.error("Erro ao buscar endereço do usuário:", error);
                setUserEndereco(null);
            });
    }, []);

    useEffect(() => {
        const isNew = sessionStorage.getItem("isNew");
        if (isNew === "true") {
            openModal();
        }
    }, []);

    function verificar() {
        if (sessionStorage.getItem("userId") === null) {
            Navigate('/login');
        }
    }

    const handlePrevModal = () => {
        setModalStep(1);
    };

    useEffect(() => {
        verificar();
    }, []);

    const checkIsNewUser = () => {
        const isNew = sessionStorage.getItem("isNew");
        if (isNew === "true") {
            setShowModal(true);
        }
    };

    useEffect(() => {
        checkIsNewUser();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        let formattedValue = value;

        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: formattedValue,
        }));

        if (name === "cep" && formattedValue.length === 9) {
            fetch(`https://viacep.com.br/ws/${formattedValue.replace("-", "")}/json/`)
                .then((response) => response.json())
                .then((data) => {
                    if (!data.erro) {
                        setFormValues((prevValues) => ({
                            ...prevValues,
                            rua: capitalizar(data.logradouro || ""),
                            cidade: capitalizar(data.localidade || ""),
                            uf: data.uf || "",
                        }));
                    }
                })
                .catch((error) => console.error("Erro ao buscar o CEP:", error));
        }
    };


    const [petIndex, setPetIndex] = useState(0);
    const [pet, setPet] = useState({
        tags: [],
        images: [],
    });

    const [pets, setPets] = useState([]);

    const aumentarIndex = () => {
        setPetIndex((prevIndex) => {
            if (pets.length <= 1) {
                setNotFound(true); // Mostra tela de erro se não houver mais pets
                return 0;
            }
            return (prevIndex + 1) % pets.length;
        });
    };

    const removerPetAtualEDepois = () => {
        setPets((prevPets) => {
            const novosPets = prevPets.filter((_, idx) => idx !== petIndex);
            if (novosPets.length === 0) {
                setNotFound(true); // Mostra tela de erro se não houver mais pets
            }
            return novosPets;
        });
        setPetIndex(0);
    };

    useEffect(() => {
        const fetchPets = async () => {
            const userId = sessionStorage.getItem("userId");
            const petData = await Reqs.listarPetsDisponiveis(userId);
            setPets(petData.data || []);
            setNotFound(petData.notFound);
        };
        fetchPets();
    }, []);

    useEffect(() => {
        if (pets.length > 0 && petIndex < pets.length) {
            const currentPet = pets[petIndex];
            const quantTags = currentPet.tags.length;
            const pet = {
                id: currentPet.id,
                nome: currentPet.nome,
                idade: currentPet.idade,
                curtidas: currentPet.curtidas,
                isLiked: currentPet.isLiked,
                descricao: currentPet.descricao,
                images: currentPet.imagens || [],
                tags: currentPet.tags,
                qntdTags: quantTags,
                nomeOng: currentPet.nomeOng,
                linkOng: currentPet.linkOng,
                isCastrado: currentPet.isCastrado,
                isVermifugo: currentPet.isVermifugo,
                isVacinado: currentPet.isVacinado,
                endereco: currentPet.endereco,
            }

            setPet(pet);
        }
    }, [pets, petIndex]);


    useEffect(() => {
        async function fetchImages() {
            if (pet.id) {
                const petImages = await Reqs.getImagensPets(pet.id);
                setPet(prevPet => ({
                    ...prevPet,
                    images: petImages || []
                }));
            }
        }
        fetchImages();
    }, [pet.id]);

    const handleSubmit = async () => {
        await Reqs.handleSubmit(formValues);
    };

    const handleAdotarPet = async () => {
        const userId = sessionStorage.getItem("userId");
        if (!userId || !pet.id) {
            return;
        }

        try {
            await url.post(`/status/pending/${pet.id}/${userId}`);
            setSelectedChat({
                petId: pet.id,
                ongNome: pet.nomeOng,
                petNome: pet.nome,
                ongLink: pet.linkOng
            });
            setSideMenuTab("chats");
            setIsSideMenuOpen(true);
            removerPetAtualEDepois();
        } catch (error) {
            console.error("Erro ao enviar solicitação de adoção:", error);
        }
    };

    const handleLikePet = async () => {
        const userId = sessionStorage.getItem("userId");
        if (!userId || !pet.id) {
            return;
        }

        try {
            await url.post(`/status/liked/${pet.id}/${userId}`);
            if(!pet.isLiked) {
                setSideMenuTab("liked");
                setIsSideMenuOpen(true);
            }
            removerPetAtualEDepois(); // Remove o pet curtido e avança para o próximo
        } catch (error) {
            console.error("Erro ao curtir o pet:", error);
        }
    };

    const handleLoadPetById = async (petId) => {
        try {
            const response = await url.get(`/pets/${petId}`);
            const data = response.data;
            
            setPet({
                id: data.id,
                nome: data.nome,
                idade: data.idade,
                curtidas: data.curtidas,
                isLiked: true,
                descricao: data.descricao,
                tags: data.tags,
                qntdTags: data.tags.length,
                images: data.imagens || [],
                nomeOng: data.nomeOng,
                linkOng: data.linkOng,
                isCastrado: data.isCastrado,
                isVermifugo: data.isVermifugo,
                isVacinado: data.isVacinado,
                endereco: data.endereco,
            });
            setNotFound(false); // <-- Garante que o erro some ao selecionar um pet curtido
            setIsSideMenuOpen(false);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className={styles.container}>
            <SideMenu
                isOpen={isSideMenuOpen}
                setIsOpen={setIsSideMenuOpen}
                onLikedPetClick={handleLoadPetById}
                onPendingPetClick={handleLoadPetById}
                refreshKey={isSideMenuOpen ? Date.now() : null}
                activeTab={sideMenuTab}
                setActiveTab={setSideMenuTab}
                selectedChat={selectedChat}
                setSelectedChat={setSelectedChat}
            />
            <NavBar />
            <div className="appArea">
                {!notFound ? (
                    <>
                        <PetActions
                            pet={pet}
                            images={pet.images}
                            adotar={handleAdotarPet}
                            passar={aumentarIndex}
                        />
                        <PetInfo
                            petId={pet.id}
                            petName={pet.nome}
                            likes={pet.curtidas}
                            petAge={pet.idade}
                            petDesc={pet.descricao}
                            ongLink={pet.linkOng}
                            ongName={pet.nomeOng}
                            qntdTags={pet.qntdTags}
                            tags={pet.tags}
                            isLiked={pet.isLiked}
                            onLike={handleLikePet}
                            isCastrado={pet.isCastrado}
                            isVermifugo={pet.isVermifugo}
                            isVacinado={pet.isVacinado}
                            endereco={pet.endereco}
                            userEndereco={userEndereco}
                        />
                    </>
                ) :
                    <>
                        <NotFoundPets />
                    </>
                }
            </div>

            {/* Modal para novos usuários */}
            {showModal && (
                <GenericModal
                    height={modalStep === 1 ? "32rem" : "37rem"}
                    isOpen={showModal}
                    onClose={() => setShowModal(false)}
                    title="Complete seu Perfil"
                    hideCloseButton={modalStep !== 2}
                    step={modalStep}
                    totalSteps={2}
                    onClick={modalStep === 2 ? handlePrevModal : undefined} // Passa a função só no modal 2
                >
                    {modalStep === 1 ? (
                        <div className={styles.extraContent}>
                            <h3>Olá! {firstName} escolha a sua foto de perfil:</h3>
                            <div className={styles.imageContainer}>
                                <ImageInput
                                    value={profileImage}
                                    preview={profileImageBase64}
                                    onChange={handleProfileImageChange}
                                />
                            </div>
                        </div>

                    ) : (<div className={styles.extraContent}>
                        <h3>Informações pessoais:</h3>
                        <FormInput
                            id="cpf"
                            name="cpf"
                            label={Strings.cpf}
                            type="text"
                            required
                            value={formValues.cpf}
                            onChange={handleInputChange}
                        />
                        <h3>Endereço:</h3>
                        <FormInput
                            id="cep"
                            name="cep"
                            label={Strings.cep}
                            type="text"
                            required
                            value={formValues.cep}
                            onChange={handleInputChange}
                        />
                        <FormInput
                            id="rua"
                            name="rua"
                            label={Strings.rua}
                            type="text"
                            required
                            value={formValues.rua}
                            onChange={handleInputChange}
                        />
                        <div className={styles.twoInputs}>
                            <div className={styles.input1}>
                                <FormInput
                                    id="complemento"
                                    name="complemento"
                                    label={Strings.complemento}
                                    type="text"
                                    value={formValues.complemento}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className={styles.input2}>
                                <FormInput
                                    id="numero"
                                    name="numero"
                                    label={Strings.numero}
                                    type="text"
                                    required
                                    value={formValues.numero}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className={styles.twoInputs}>
                            <div className={styles.input1}>
                                <FormInput
                                    id="cidade"
                                    name="cidade"
                                    label={Strings.cidade}
                                    type="text"
                                    required
                                    value={formValues.cidade}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className={styles.input2}>
                                <DropDown
                                    id="uf"
                                    name="uf"
                                    label={Strings.uf}
                                    options={ufs}
                                    value={formValues.uf}
                                    onChange={(e) => {
                                        const { value } = e.target;
                                        setFormValues((prevValues) => ({
                                            ...prevValues,
                                            uf: value,
                                        }));
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    )}
                    <div className={styles.footerModal}>
                        <div className={styles.link}
                            onClick={modalStep === 1 ? handleNextModal : Reqs.handleCloseModal}>
                            <HiperLink
                                href="#"
                                label="Fazer Depois"
                                haveDecoration={false}
                            />
                        </div>
                        <div className={styles.button}
                            onClick={modalStep === 1 ? signImage : handleSubmit}>
                            <PrimaryButton
                                className={styles.primaryButton}
                                type="button"
                                text={modalStep === 1 ? "Próximo" : "Finalizar"}
                            />
                        </div>
                    </div>
                </GenericModal>
            )}
        </div >
    );
}

export default Initial;