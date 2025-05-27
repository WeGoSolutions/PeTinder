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
    return (
        <div className="editPetModal">
            <div className="header">
                <IoCloseOutline onClick={props.onClose} className="closeButton" />
                <span className="title">Edição de Pet</span>
            </div>
            <div className="petInfos">
                <div className="petInfosTags">
                    <span >Selecione as seguintes características:</span>
                    <div className="petTags">
                        <Tag color="#979797" tagName="Ativo" />
                        <Tag color="#979797" tagName="Calmo" />
                        <Tag color="#979797" tagName="Brincalhão" />
                        <Tag color="#979797" tagName="Carinhoso" />
                    </div>
                    <div className="petTags">
                        <Tag color="#979797" tagName="Curioso" />
                        <Tag color="#979797" tagName="Independente" />
                        <Tag color="#979797" tagName="Protetor" />
                        <Tag color="#979797" tagName="Sociável" />
                    </div>
                    <div className="petTags">
                        <Tag color="#979797" tagName="Medroso" />
                        <Tag color="#979797" tagName="Territorial" />
                        <Tag color="#979797" tagName="Obediente" />
                        <Tag color="#979797" tagName="Teimoso" />
                    </div>
                </div>
                <div className="division"></div>

                <div className="petInfosVac">
                    <img src="/public/isCastrado.svg" alt="é Castrado?" />
                    <span>Castrado</span>
                    <img src="/public/isVermifugo.svg" alt="é Vermifugado?" />
                    <span>Vermifugado</span>
                    <img src="/public/isVacinado.svg" alt="é Vacinado?" />
                    <span>Vacinado</span>
                </div>
                <div>
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
