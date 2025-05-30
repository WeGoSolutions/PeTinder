import { url } from "../../../provider/apiInstance";
import FirstPetEdit from "../../../components/ong/FirstPetModal";
import SecondPetEdit from "../../../components/ong/SecondPetModal";
import PetCard from "../../../components/ong/PetCard";
import { IoSearch } from "react-icons/io5";
import { IoCloseOutline } from "react-icons/io5";
import { useState, useEffect } from "react";
import GenericModal from "../../../components/GenericModal";
import FormInput from "../../../components/FormInput";
import DropDown from "../../../components/DropDown";
import PrimaryButton from "../../../components/PrimaryButton";
import styles from './css/petContent.module.css';
import Tag from "../../../components/Tag";
import SecondaryButton from "../../../components/SecondaryButton";
import { convertImagesToBase64 } from "../../../utils";

export default function PetsContent() {
    const [editStep, setEditStep] = useState(0);
    const [modalMode, setModalMode] = useState("edit");
    const [modo, setModo] = useState("editar");
    const [pets, setPets] = useState([]);
    const idade = ["anos", "meses"];
    const porte = ["pequeno", "medio", "grande"];
    const [images, setImages] = useState([]);
    const [formStep1, setFormStep1] = useState({
        nome: "",
        idade: "",
        idadeTipo: "anos",
        porte: "",
        descricao: "",
        sexo: "",
        peso: "",
        altura: "",
    });
    const [formStep2, setFormStep2] = useState({
        tags: [],
        isCastrado: false,
        isVermifugo: false,
        isVacinado: false,
    });

    const handleStep1Change = (e) => {
        const { name, value, type } = e.target;
        setFormStep1(prev => ({
            ...prev,
            [name]: type === "number" ? Number(value) : value
        }));
    };

    const handleNextStep = () => {
        setFormStep1({
            nome: document.getElementById("nome").value,
            idade: document.getElementById("idade").value,
            idadeTipo: document.getElementById("Anos").value,
            porte: document.getElementById("porte").value,
            descricao: document.getElementById("descricao").value,
            sexo: document.querySelector('input[name="sexo"]:checked')?.value || "",
            peso: document.getElementById("peso")?.value || "",
            altura: document.getElementById("altura")?.value || "",
        });
        goToSecondStep();
    };

    const handleSavePet = async () => {
        const selectedTags = Object.entries(disabledTags)
            .filter(([tag, isDisabled]) => !isDisabled)
            .map(([tag]) => tag);

        const vac = vacStatus;

        let imagemBase64 = [];
        if (images.length > 0) {
            const files = images.map(img => img.file);
            imagemBase64 = await convertImagesToBase64(files);
        }

        let idadeFinal = Number(formStep1.idade);
        if (formStep1.idadeTipo === "meses") {
            idadeFinal = idadeFinal / 100;
        }

        const payload = {
            idade: idadeFinal,
            nome: formStep1.nome,
            peso: Number(formStep1.peso) || 0,
            altura: Number(formStep1.altura) || 0,
            curtidas: 0,
            tags: selectedTags,
            descricao: formStep1.descricao,
            ongId: Number(sessionStorage.getItem("ongId")),
            sexo: formStep1.sexo?.toUpperCase() || "",
            isCastrado: vac.castrado,
            isVermifugo: vac.vermifugado,
            isVacinado: vac.vacinado,
            imagemBase64,
        };

        try {
            await url.post("/pets", payload);
            closeEditModal();
            window.location.reload(); // Recarrega a página para atualizar a lista de pets
        } catch (error) {
            console.error(error);
        }
    };

    const addImage = (event) => {
        const file = event.target.files[0];
        if (file && images.length < 5) {
            const previewUrl = URL.createObjectURL(file);
            setImages((prevImages) => [...prevImages, { file, url: previewUrl }]);
        }
    };
    const removeImage = (indexToRemove) => {
        setImages((prevImages) =>
            prevImages.filter((_, index) => index !== indexToRemove)
        );
    };
    const allTags = [
        ["Ativo", "Calmo", "Brincalhão", "Carinhoso"],
        ["Curioso", "Independente", "Protetor", "Sociável"],
        ["Medroso", "Territorial", "Obediente", "Teimoso"]
    ];

    const handleTagClick = (tagName) => {
        const selectedCount = Object.values(disabledTags).filter(v => !v).length;
        // Se a tag já está selecionada, permite desmarcar normalmente
        if (!disabledTags[tagName]) {
            setDisabledTags(prev => ({
                ...prev,
                [tagName]: true
            }));
        } else if (selectedCount < 7) {
            // Só permite selecionar se ainda não atingiu o limite
            setDisabledTags(prev => ({
                ...prev,
                [tagName]: false
            }));
        }
    };

    const [disabledTags, setDisabledTags] = useState(() => {
        // Inicializa todas como true (desabilitadas)
        const obj = {};
        allTags.flat().forEach(tag => { obj[tag] = true; });
        return obj;
    });

    const vacStates = [
        { key: "castrado", img: "/isCastrado.svg", label: "Castrado" },
        { key: "vermifugado", img: "/isVermifugo.svg", label: "Vermifugado" },
        { key: "vacinado", img: "/isVacinado.svg", label: "Vacinado" }
    ];
    const [vacStatus, setVacStatus] = useState({
        castrado: false,
        vermifugado: false,
        vacinado: false
    });
    const handleVacClick = (key) => {
        setVacStatus(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    useEffect(() => {
        const ongId = sessionStorage.getItem("ongId");
        if (!ongId) return;
        url.get(`/ongs/${ongId}/pets`)
            .then(res => {
                const petsData = Array.isArray(res.data) ? res.data.map(pet => ({
                    id: pet.petId,
                    nome: pet.petNome,
                    src: pet.imageUrl && pet.imageUrl.length > 0 ? pet.imageUrl[0] : "",
                })) : [];
                setPets(petsData);
            })
            .catch(err => {
                setPets([]);
                console.error("Erro ao buscar pets da ONG:", err);
            });
    }, []);

    const openAddModal = () => {
        setModalMode("add");
        setModo("Adicionar");
        setEditStep(1);
    };

    const openEditModal = () => {
        setModalMode("edit");
        setModo("Editar");
        setEditStep(1);
    };

    const closeEditModal = () => setEditStep(0);
    const goToSecondStep = () => setEditStep(2);
    const goBackToFirstStep = () => setEditStep(1);

    const deletePet = (idToDelete) => {
        setPets((prevPets) => prevPets.filter((pet) => pet.id !== idToDelete));
    };

    return (
        <div className={styles.petContainer}>
            <div className={styles.petHeader}>
                <IoSearch className={styles.searchIcon} />
                <input type="text" className={styles.searchBar} />
                <button className={styles.addPet} onClick={openAddModal}>Adicionar +</button>
            </div>
            {editStep > 0 && (
                <GenericModal
                    isOpen={editStep > 0}
                    onClose={editStep === 2 ? goBackToFirstStep : closeEditModal}
                    width="600px"
                    height={editStep === 1 ? "39rem" : "40rem"}
                    title={modo + " do Pet"}
                    hasSteps
                    step={editStep}
                    totalSteps={2}
                >
                    {editStep === 1 ? (
                        <>
                            <div className={styles.petInfos}>
                                <FormInput
                                    id="nome"
                                    name="nome"
                                    label="Nome do Pet"
                                    required
                                />
                                <div className={styles.dropDownQuestions}>
                                    <DropDown
                                        id="porte"
                                        name="porte"
                                        label="Porte"
                                        options={porte}
                                        required
                                    />
                                    <div className={styles.petAge}>
                                        <FormInput
                                            id="idade"
                                            name="idade"
                                            label="Idade"
                                            type="number"
                                            required
                                        />
                                        <DropDown
                                            id="Anos"
                                            label="Anos"
                                            options={idade}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className={styles.desc}>
                                    <span>Descrição</span>
                                    <textarea id="descricao" placeholder="DESCRIÇÃO"></textarea>
                                </div>
                                <div className={styles.petInfosCheckbox}>
                                    <span className={styles.title}>Sexo</span>
                                    <div className={styles.checkbox}>
                                        <input
                                            type="radio"
                                            name="sexo"
                                            value="femea"
                                        />
                                        <label htmlFor="femea">Fêmea</label>
                                    </div>
                                    <div className={styles.checkbox}>
                                        <input
                                            type="radio"
                                            name="sexo"
                                            value="macho"
                                        />
                                        <label htmlFor="macho">Macho</label>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.next}>
                                <div onClick={handleNextStep}>
                                    <PrimaryButton text="Próximo" />
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className={styles.step2}>
                                <div className={styles.petInfos}>
                                    <div className={styles.petInfosTags}>
                                        <span >Selecione as seguintes características:</span>
                                        {allTags.map((row, rowIdx) => (
                                            <div className={styles.petTags} key={rowIdx}>
                                                {row.map(tag => (
                                                    <Tag
                                                        key={tag}
                                                        tagName={tag}
                                                        isDisabled={disabledTags[tag]}
                                                        onClick={() => handleTagClick(tag)}
                                                        cursor="pointer"
                                                    />
                                                ))}
                                            </div>
                                        ))}
                                    </div>
                                    <div className={styles.division}></div>

                                    <div className={styles.petInfosVac}>
                                        {vacStates.map(vac => (
                                            <div
                                                key={vac.key}
                                                style={{
                                                    display: "flex",
                                                    flexDirection: "row",
                                                    alignItems: "center",
                                                    cursor: "pointer",
                                                    marginRight: 12
                                                }} onClick={() => handleVacClick(vac.key)}
                                            >
                                                <img
                                                    src={vacStatus[vac.key] ? vac.img : "/isNothing.svg"}
                                                    alt={vac.label}
                                                />
                                                <span>{vac.label}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className={styles.imgAdd}>
                                        <span>Fotos do pet:</span>
                                        <div className={styles.imagePreviewWrapper}>
                                            {Array.from({ length: 5 }).map((_, i) => (
                                                <div key={i} className={styles.previewBox}>
                                                    {images[i] && (
                                                        <>
                                                            <img src={images[i].url} alt={`preview-${i}`} />
                                                            <button
                                                                className={styles.removeBtn}
                                                                onClick={() => removeImage(i)}
                                                                type="button"
                                                            >
                                                                ✕
                                                            </button>
                                                        </>
                                                    )}
                                                </div>
                                            ))}

                                            <label className={styles.uploadBtn}>
                                                +
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={addImage}
                                                    hidden
                                                />
                                            </label>
                                        </div>
                                    </div>

                                </div>
                                <div className={styles.next2}>
                                    <div onClick={handleSavePet}>
                                        <PrimaryButton text="Salvar" />
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </GenericModal>
            )}

            <div className={styles.pets}>
                {pets.map((pet) => (
                    <PetCard
                        key={pet.id}
                        id={pet.id}
                        nome={pet.nome}
                        src={pet.src}
                        onEdit={openEditModal}
                        onDelete={() => deletePet(pet.id)}
                    />
                ))}
            </div>
        </div>
    );
}