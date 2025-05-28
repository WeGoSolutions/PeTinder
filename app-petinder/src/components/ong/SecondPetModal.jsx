import { IoCloseOutline } from "react-icons/io5";
import PrimaryButton from "../PrimaryButton";
import SecondaryButton from "../SecondaryButton"
import Tag from "../Tag";
import { useState } from "react";

function SecondPetEdit(props) {
    const [images, setImages] = useState([]);

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
        setDisabledTags(prev => ({
            ...prev,
            [tagName]: !prev[tagName]
        }));
    };

    const [disabledTags, setDisabledTags] = useState(() => {
        // Inicializa todas como true (desabilitadas)
        const obj = {};
        allTags.flat().forEach(tag => { obj[tag] = true; });
        return obj;
    });
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
                    <img src="/isCastrado.svg" alt="é Castrado?" />
                    <span>Castrado</span>
                    <img src="/isVermifugo.svg" alt="é Vermifugado?" />
                    <span>Vermifugado</span>
                    <img src="/isVacinado.svg" alt="é Vacinado?" />
                    <span>Vacinado</span>
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
