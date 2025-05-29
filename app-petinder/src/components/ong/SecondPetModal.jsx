import { IoCloseOutline } from "react-icons/io5";
import PrimaryButton from "../PrimaryButton";
import SecondaryButton from "../SecondaryButton"
import Tag from "../Tag";
import { useState } from "react";

function SecondPetEdit(props) {
    const [images, setImages] = useState([]);

    // const [formValues, setFormValues] = useState({
    //     nome: "",
    //     idade: "",
    //     porte: "",
    //     curtidas: "0",
    //     tags: "",
    //     descricao: "",
    //     isCastrado: "",
    //     isVermifugo: "",
    //     isVacinado: "",
    //     sexo: "",
    //     imagemBase64: ""
    // });


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
    return (
        <div className="editPetModal">
            <div className="header">
                <IoCloseOutline onClick={props.onClose} className="closeButton" />
                <span className="title">Edição de Pet</span>
            </div>
            <div className="petInfos">
                <div className="petInfosTags">
                    <span >Selecione as seguintes características:</span>
                    {allTags.map((row, rowIdx) => (
                        <div className="petTags" key={rowIdx}>
                            {row.map(tag => (
                                <Tag
                                    key={tag}
                                    tagName={tag}
                                    isDisabled={disabledTags[tag]}
                                    onClick={() => handleTagClick(tag)}
                                />
                            ))}
                        </div>
                    ))}
                </div>
                <div className="division"></div>

                <div className="petInfosVac">
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
                <div className="imgAdd">
                    <span>Fotos do pet:</span>
                    <div className="imagePreviewWrapper">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <div key={i} className="previewBox">
                                {images[i] && (
                                    <>
                                        <img src={images[i].url} alt={`preview-${i}`} />
                                        <button
                                            className="removeBtn"
                                            onClick={() => removeImage(i)}
                                            type="button"
                                        >
                                            ✕
                                        </button>
                                    </>
                                )}
                            </div>
                        ))}

                        <label className="uploadBtn">
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
            <div className="bottomOpt">
                <button className="button2"></button>
                <button className="button1"></button>
            </div>
            <div className="next2">
                <div className="back" onClick={props.onBack}>
                    <SecondaryButton text="Voltar" />
                </div>
                <PrimaryButton text="Salvar" />
            </div>
        </div>
    );
}

export default SecondPetEdit;
