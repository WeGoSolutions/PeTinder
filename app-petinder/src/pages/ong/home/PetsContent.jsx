import { url } from "../../../provider/apiInstance";
import reqs from "../../../reqs";
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
import { convertImagesToBase64 } from "../../../utils/utils";
import PaginationControls from '../../../components/ong/PaginationControls';

export default function PetsContent() {
    const [editingPetId, setEditingPetId] = useState(null);
    const [editStep, setEditStep] = useState(0);
    const [modo, setModo] = useState("editar");
    const [pets, setPets] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    const idade = ["Anos", "Meses"];
    const porte = ["Pequeno", "Médio", "Grande"];
    const [images, setImages] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [petToDelete, setPetToDelete] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
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
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    const handleStep1Change = (e) => {
        const { name, value, type } = e.target;
        setFormStep1(prev => ({
            ...prev,
            [name]: type === "number" ? Number(value) : value
        }));
    };

    const filteredPets = (pets && Array.isArray(pets))
        ? pets.filter(pet =>
            pet.petNome && pet.petNome.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : [];

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
        if (isButtonDisabled) return;
        setIsButtonDisabled(true);
        const selectedTags = Object.entries(disabledTags)
            .filter(([tag, isDisabled]) => !isDisabled)
            .map(([tag]) => tag);

        const vac = vacStatus;

        const imagensResult = await (async () => {
        const base64s = [];
        const nomes = [];
        for (let i = 0; i < images.length; i++) {
            const img = images[i];
            if (img.file) {
                // Nova imagem (file)
                const [base64] = await convertImagesToBase64([img.file]);
                base64s.push(base64);
                nomes.push(img.file.name || `imagem_${i}`);
            } else if (img.url) {
                // Imagem existente (url) -> busca blob e converte
                try {
                    const response = await fetch(img.url);
                    const blob = await response.blob();
                    const base64 = await new Promise((resolve, reject) => {
                        const reader = new FileReader();
                        reader.onloadend = () => resolve(reader.result);
                        reader.onerror = reject;
                        reader.readAsDataURL(blob);
                    });
                    base64s.push(base64);
                } catch (err) {
                    console.error("Erro ao buscar imagem por URL:", img.url, err);
                    base64s.push(null);
                }

                // tenta extrair nome do caminho da URL, com fallback
                try {
                    const parsed = new URL(img.url, window.location.href);
                    const extracted = decodeURIComponent(parsed.pathname.split("/").pop() || `imagem_${i}`);
                    nomes.push(extracted);
                } catch {
                    const parts = img.url.split("/");
                    nomes.push(decodeURIComponent(parts.pop() || `imagem_${i}`));
                }
            } else {
                base64s.push(null);
                nomes.push(null);
            }
        }
        return { imagensBase64: base64s, nomesArquivos: nomes };
    })();

    const imagensBase64 = imagensResult.imagensBase64;
    const nomesArquivos = imagensResult.nomesArquivos;

    let idadeFinal = Number(formStep1.idade);
    if (formStep1.idadeTipo === "Meses") {
        idadeFinal = idadeFinal / 100;
    }

    const payload = {
        idade: idadeFinal,
        nome: formStep1.nome,
        peso: Number(formStep1.peso) || 0,
        altura: Number(formStep1.altura) || 0,
        porte: formStep1.porte,
        curtidas: 0,
        tags: selectedTags,
        descricao: formStep1.descricao,
        ongId: sessionStorage.getItem("ongId"),
        sexo: formStep1.sexo?.toUpperCase() || "",
        isCastrado: vac.castrado,
        isVermifugado: vac.vermifugado,
        isVacinado: vac.vacinado,
        imagensBase64,
        nomesArquivos, // <- adicionado
    };

        const result = await reqs.editarInfosDoPet(modo, editingPetId, payload);
        if (result.success) {
            closeEditModal();
            window.location.reload();
        } else {
            console.error(result.error);
            setIsButtonDisabled(false); // Reabilita o botão em caso de erro
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
        if (!disabledTags[tagName]) {
            setDisabledTags(prev => ({
                ...prev,
                [tagName]: true
            }));
        } else if (selectedCount < 7) {
            setDisabledTags(prev => ({
                ...prev,
                [tagName]: false
            }));
        }
    };

    const [disabledTags, setDisabledTags] = useState(() => {
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

        const fetchPets = async () => {
            try {
                const result = await reqs.listarPetsDaOng(ongId, currentPage, 10);

                if (!result?.data) {
                    console.error("Erro: resposta inválida ao listar pets", result);
                    return;
                }

                const content = result.data.content || [];

                // Verifica acessibilidade da primeira imagem (somente em caso de erro será logado)
                const firstImageUrl = content[0]?.imagensUrls?.[0];
                if (firstImageUrl) {
                    try {
                        const resp = await fetch(firstImageUrl);
                        if (!resp.ok) {
                            console.error("Imagem não acessível:", firstImageUrl, "status:", resp.status);
                        }
                    } catch (err) {
                        console.error("Erro ao acessar imagem:", firstImageUrl, err);
                    }
                }

                setPets(content);
                setTotalPages(result.data.totalPages ?? 0);
                setTotalElements(result.data.totalElements ?? 0);
            } catch (error) {
                console.error("Erro ao listar pets da ONG:", error);
            }
        };

        fetchPets();
    }, [currentPage]);

    const openAddModal = () => {
        setModo("Adicionar");
        setFormStep1({
            nome: "",
            idade: "",
            idadeTipo: "anos",
            porte: "",
            descricao: "",
            sexo: "",
            peso: "",
            altura: "",
        });
        setFormStep2({
            tags: [],
            isCastrado: false,
            isVermifugo: false,
            isVacinado: false,
        });
        setImages([]);
        const obj = {};
        allTags.flat().forEach(tag => { obj[tag] = true; });
        setDisabledTags(obj);
        setVacStatus({
            castrado: false,
            vermifugado: false,
            vacinado: false
        });
        setEditStep(1);
    };

    const openEditModal = async (petId) => {
        setModo("Editar");
        setEditingPetId(petId);

        const result = await reqs.modalDeEdicao(petId);
        if (result.success) {
            const pet = result.pet;

            let idade = "";
            let idadeTipo = "anos";
            if (pet.idade !== undefined && pet.idade !== null) {
                if (pet.idade < 1) {
                    idade = String(Math.round(pet.idade * 100));
                    idadeTipo = "Meses";
                } else {
                    idade = String(Math.floor(pet.idade));
                    idadeTipo = "Anos";
                }
            }

            setFormStep1({
                nome: pet.nome || "",
                idade,
                idadeTipo,
                porte: pet.porte || "",
                descricao: pet.descricao || "",
                sexo: pet.sexo ? pet.sexo.toLowerCase() : "",
                peso: pet.peso || "",
                altura: pet.altura || "",
            });
            const tagsObj = {};
            allTags.flat().forEach(tag => {
                tagsObj[tag] = !pet.tags?.includes(tag);
            });
            setDisabledTags(tagsObj);
            setVacStatus({
                castrado: !!pet.isCastrado,
                vermifugado: !!pet.isVermifugo,
                vacinado: !!pet.isVacinado,
            });
            if (pet.imagens && pet.imagens.length > 0) {
                setImages(
                    pet.imagens.map(url => ({
                        file: null,
                        url,
                    }))
                );
            } else {
                setImages([]);
            }
            setEditStep(1);
        } else {
            console.error("Erro ao buscar pet para edição:", result.error);
        }
    };

    const closeEditModal = () => setEditStep(0);
    const goToSecondStep = () => setEditStep(2);
    const goBackToFirstStep = () => setEditStep(1);

    const handleDeleteClick = (pet) => {
        setPetToDelete(pet);
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = async () => {
        if (petToDelete) {
            const result = await reqs.deletarPet(petToDelete.petId);
            if (result.success) {
                setShowDeleteModal(false);
                setPetToDelete(null);
                window.location.reload();
            } else {
                console.error("Erro ao deletar pet:", result.error);
            }
        } else {
            setShowDeleteModal(false);
            setPetToDelete(null);
        }
    };

    const handleCancelDelete = () => {
        setShowDeleteModal(false);
        setPetToDelete(null);
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage < totalPages) {
            setCurrentPage(newPage);
        }
    };

    return (
        <div className={styles.petContainer}>
            <div className={styles.petHeader}>
                {/* <IoSearch className={styles.searchIcon} /> */}
                <input
                    type="text"
                    className={styles.searchBar}
                    placeholder="Pesquisar por nome"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                />
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
                                    value={formStep1.nome}
                                    onChange={handleStep1Change}
                                />
                                <div className={styles.dropDownQuestions}>
                                    <DropDown
                                        id="porte"
                                        name="porte"
                                        label="Porte"
                                        options={porte}
                                        required
                                        value={formStep1.porte}
                                        onChange={handleStep1Change}
                                    />
                                    <div className={styles.petAge}>
                                        <FormInput
                                            id="idade"
                                            name="idade"
                                            label="Idade"
                                            type="number"
                                            required
                                            value={formStep1.idade}
                                            onChange={handleStep1Change}
                                        />
                                        <DropDown
                                            id="Anos"
                                            name="idadeTipo"
                                            label="Anos"
                                            options={idade}
                                            required
                                            value={formStep1.idadeTipo}
                                            onChange={handleStep1Change}
                                        />
                                    </div>
                                </div>
                                <div className={styles.desc}>
                                    <span>Descrição</span>
                                    <textarea
                                        id="descricao"
                                        name="descricao"
                                        placeholder="DESCRIÇÃO"
                                        value={formStep1.descricao}
                                        onChange={e => setFormStep1(prev => ({ ...prev, descricao: e.target.value }))}
                                    />
                                </div>
                                <div className={styles.petInfosCheckbox}>
                                    <span className={styles.title}>Sexo</span>
                                    <div className={styles.checkbox}>
                                        <input
                                            type="radio"
                                            name="sexo"
                                            value="femea"
                                            checked={formStep1.sexo === "femea"}
                                            onChange={handleStep1Change}
                                        />
                                        <label htmlFor="femea">Fêmea</label>
                                    </div>
                                    <div className={styles.checkbox}>
                                        <input
                                            type="radio"
                                            name="sexo"
                                            value="macho"
                                            checked={formStep1.sexo === "macho"}
                                            onChange={handleStep1Change}
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
                                    <div onClick={isButtonDisabled ? undefined : handleSavePet}>
                                        <PrimaryButton text="Salvar" disabled={isButtonDisabled} />
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </GenericModal>
            )}

            {showDeleteModal && petToDelete && (
                <GenericModal
                    isOpen={showDeleteModal}
                    onClose={handleCancelDelete}
                    width="40rem"
                    height="15rem"
                    title="Confirmação"
                >
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 24 }}>
                        <span style={{ fontSize: 18, textAlign: "center" }}>
                            Tem certeza que quer deletar o pet <b>{petToDelete.nome}</b>?
                        </span>
                        <div style={{ display: "flex", gap: 16 }}>
                            <div onClick={handleConfirmDelete}>
                                <PrimaryButton text="Deletar" />
                            </div>
                            <div className="cancelButtonDelete" onClick={handleCancelDelete}>
                                <SecondaryButton text="Cancelar" />
                            </div>
                        </div>
                    </div>
                </GenericModal>
            )}

            <div className={styles.pets}>
                {Array.isArray(filteredPets) && filteredPets.map((pet) => (
                    <PetCard
                        key={pet.petId}
                        id={pet.petId}
                        nome={pet.petNome}
                        isAdopted={pet.status && pet.status.includes('ADOPTED')}
                        src={pet.imageUrl && pet.imageUrl.length > 0 ? pet.imageUrl[0] : ""}
                        onEdit={() => openEditModal(pet.petId)}
                        onDelete={() => handleDeleteClick(pet)}
                    />
                ))}
            </div>
            <div className={styles.paginationWrapper}>
                <PaginationControls
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalElements={totalElements}
                    currentItemsCount={pets.length}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    );
}