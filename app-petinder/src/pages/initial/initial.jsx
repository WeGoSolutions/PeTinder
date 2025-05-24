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
import { formatarCEP, capitalizar } from "../../utils";
import { url } from "../../provider/apiInstance"; // Certifique-se de importar a instância axios
import ImageInput from "../../components/ImageInput";
import { convertImagesToBase64 } from "../../utils"; // ajuste o caminho se necessário

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
        // Verifica se há imagem selecionada
        if (!profileImage) {
            alert("Selecione uma imagem de perfil.");
            return;
        }

        const userId = sessionStorage.getItem("userId");
        const authToken = sessionStorage.getItem("authToken");

        try {
            const [base64Image] = await convertImagesToBase64([profileImage]);
            await url.post(`/users/${userId}/imagem`, {
                imagemBase64: base64Image
            }, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${authToken}`,
                },
            });
            setModalStep(2); // Só avança se a requisição der certo
        } catch (error) {
            alert("Erro ao enviar a imagem de perfil.");
            console.error(error);
        }
    };

    const handleNextModal = () => {
        setModalStep(2);
    };

    const handleCloseModalAndReset = async () => {
        setShowModal(false);
        setModalStep(1);
        await handleCloseModal();
    };

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

        // Aplica a máscara no campo de CEP
        const formattedValue = name === "cep" ? formatarCEP(value) : value;

        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: formattedValue,
        }));

        // Busca os dados do endereço ao preencher o CEP
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
                    } else {
                        alert("CEP não encontrado.");
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
        setPetIndex((prevIndex) => (prevIndex + 1) % pets.length);
    };

    useEffect(() => {
        fetch("http://localhost:8080/pets")
            .then(response => response.json())
            .then(json => setPets(json))
            .catch(error => console.error("Error fetching pets:", error));
    }, []);

    useEffect(() => {
        if (pets.length > 0 && petIndex < pets.length) {
            const currentPet = pets[petIndex];
            const quantTags = currentPet.tags.length;
            setPet({
                id: currentPet.id,
                nome: currentPet.nome,
                idade: currentPet.idade,
                curtidas: currentPet.curtidas,
                isLiked: currentPet.isLiked,
                descricao: currentPet.descricao,
                tags: currentPet.tags,
                qntdTags: quantTags,
            });
        }
    }, [pets, petIndex]);

    useEffect(() => {
        if (pet.id) {
            fetch(`http://localhost:8080/pets/${pet.id}/imagens`)
                .then(response => response.json())
                .then(json => setPet(prevPet => ({
                    ...prevPet, // Mantém as propriedades existentes do estado `pet`
                    images: json // Atualiza apenas a propriedade `images`

                })))
                .catch(error => console.error("Error fetching pet images:", error));
        }
    }, [pet.id]);

    const handleCloseModal = async () => {
        const userId = sessionStorage.getItem("userId");
        const authToken = sessionStorage.getItem("authToken");

        if (!userId) {
            alert("Usuário não identificado.");
            return;
        }

        try {
            const response = await url.patch(`/users/${userId}/user-novo`, null, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${authToken}`, // Adiciona o token no cabeçalho
                },
            });

            if (response.status === 200) {
                sessionStorage.setItem("isNew", "false");
                setShowModal(false);
            } else {
                alert("Erro ao atualizar o status de novo usuário.");
            }
        } catch (error) {
            console.error("Erro ao atualizar o status de novo usuário:", error);
            alert("Erro ao atualizar o status de novo usuário.");
        }
    };

    const handleSubmit = async () => {
        console.log("handleSubmit foi chamado"); // Adicione esta linha para depuração
        const userId = sessionStorage.getItem("userId");
        const authToken = sessionStorage.getItem("authToken"); // Recupera o token do sessionStorage

        if (!userId) {
            alert("Usuário não identificado.");
            return;
        }

        try {
            const response = await url.put(`/users/${userId}/optional`, formValues, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${authToken}`, // Adiciona o token no cabeçalho
                },
            });

            if (response.status === 200) {
                alert("Dados atualizados com sucesso!");
                await handleCloseModal(); // Chama a função para atualizar o status de novo usuário e fechar o modal
            } else {
                alert("Erro ao atualizar os dados.");
            }
        } catch (error) {
            console.error("Erro ao enviar os dados:", error);
            alert("Erro ao enviar os dados.");
        }
    };

    return (
        <div className={styles.container}>
            <SideMenu />
            <NavBar />
            <div className="appArea">
                <PetActions
                    images={pet.images}
                    adotar={aumentarIndex}
                    passar={aumentarIndex} />
                <PetInfo
                    petId={pet.id}
                    petName={pet.nome}
                    likes={pet.curtidas}
                    petAge={pet.idade}
                    petDesc={pet.descricao}
                    ongLink="https://www.instagram.com/projetoaumigosdobem/"
                    ongName="AUmigos Do Bem"
                    qntdTags={pet.qntdTags}
                    tags={pet.tags}
                    isLiked={pet.isLiked} />
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
                            label="CPF"
                            type="text"
                            required
                            value={formValues.cpf}
                            onChange={handleInputChange}
                        />
                        <h3>Endereço:</h3>
                        <FormInput
                            id="cep"
                            name="cep"
                            label="CEP"
                            type="text"
                            required
                            value={formValues.cep}
                            onChange={handleInputChange}
                        />
                        <FormInput
                            id="rua"
                            name="rua"
                            label="Rua"
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
                                    label="Complemento"
                                    type="text"
                                    value={formValues.complemento}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className={styles.input2}>
                                <FormInput
                                    id="numero"
                                    name="numero"
                                    label="Número"
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
                                    label="Cidade"
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
                                    label="UF"
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
                            onClick={modalStep === 1 ? handleNextModal : handleCloseModal}>
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