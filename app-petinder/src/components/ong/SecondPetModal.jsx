import { IoCloseOutline } from "react-icons/io5";
import PrimaryButton from "../PrimaryButton";
import SecondaryButton from "../SecondaryButton"
import Tag from "../Tag";
import { useState } from "react";

function SecondPetEdit(props) {

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




    return (
        <div className={styles.editPetModal}>
            <div className={styles.header}>
                <IoCloseOutline onClick={props.onClose} className="closeButton" />
                <span className="title">Edição de Pet</span>
            </div>
            
        </div>
    );
}

export default SecondPetEdit;
