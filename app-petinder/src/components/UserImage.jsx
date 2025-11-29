import { useState, useRef, useEffect } from "react";
import { CgProfile } from "react-icons/cg";
import { TiPencil } from "react-icons/ti";
import GenericModal from "./GenericModal";
import PrimaryButton from "./PrimaryButton";
import SecondaryButton from "./SecondaryButton";
import { convertImagesToBase64 } from "../utils/utils";
import reqs from "../reqs";

function UserImage({ src, alt = "Foto do usuário", size = 180, hasEdit }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [preview, setPreview] = useState(src);
    const [selectedFile, setSelectedFile] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
    const inputRef = useRef(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const urlPreview = URL.createObjectURL(file);
            setPreview(urlPreview);
            setSelectedFile(file);
        }
    };

    const handleOpenFileDialog = (e) => {
        e.preventDefault();
        if (inputRef.current) {
            inputRef.current.value = ""; // permite selecionar a mesma imagem novamente
            inputRef.current.click();
        }
    };

    const handleSave = async () => {
        if (!selectedFile) return;
        setIsSaving(true);
        
        try {
            const [base64] = await convertImagesToBase64([selectedFile]);
            const result = await reqs.saveUserAndOngImage(base64);
            
            if (result.success) {
                window.location.reload();
            } else {
                setIsSaving(false);
            }
        } catch (error) {
            setIsSaving(false);
        }
    };

    useEffect(() => {
        if (modalOpen) {
            setPreview(src);
            setSelectedFile(null);
        }
    }, [modalOpen, src]);

    return (
        <>
            <div className="userImageContainer">
                <div className="userImageWrapper" style={{ width: size, height: size }}>
                    {src ? (
                        <img src={src} alt={alt} className="image" />
                    ) : (
                        <CgProfile className="placeholder" />
                    )}
                </div>
                {hasEdit && (
                    <div className="userImageEdit" onClick={() => setModalOpen(true)}>
                        <TiPencil size={25} />
                        <p>Editar Foto</p>
                    </div>
                )}
            </div>
            {modalOpen && (
                <GenericModal
                    isOpen={modalOpen}
                    onClose={() => setModalOpen(false)}
                    title="Editar Foto de Perfil"
                    width="400px"
                    height="400px"
                >
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "20px"
                    }}>
                        <div
                            style={{
                                width: 150,
                                height: 150,
                                borderRadius: "50%",
                                overflow: "hidden",
                                background: "#eee",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center"
                            }}
                        >
                            {preview ? (
                                <img
                                    src={preview}
                                    alt="Preview"
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover"
                                    }}
                                />
                            ) : (
                                <CgProfile size={100} color="#ccc" />
                            )}
                        </div>
                        <div className="UserImageEditPhotoButton">
                            <div className="userImageEdit2" onClick={handleOpenFileDialog}>
                                <SecondaryButton
                                    type="button"
                                    text="Selecionar Imagem"
                                />
                            </div>
                            <input
                                ref={inputRef}
                                id="profile-image-upload"
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                style={{ display: "none" }}
                                tabIndex={-1}
                            />
                        </div>
                        <div className="userImageHandleButton" onClick={handleSave}>
                            <PrimaryButton
                                type="button"
                                text={isSaving ? "Salvando..." : "Salvar"}
                                disabled={isSaving || !selectedFile}
                            />
                        </div>
                    </div>
                </GenericModal>
            )}
        </>
    );
}

export default UserImage;