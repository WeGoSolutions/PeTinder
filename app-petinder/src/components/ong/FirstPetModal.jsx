import { IoCloseOutline } from "react-icons/io5";
import FormInput from "../FormInput";
import DropDown from "../DropDown"
import PrimaryButton from "../PrimaryButton";

function FirstPetEdit(props) {
    const idade = ["anos", "meses"];
    const porte = ["pequeno", "medio", "grande"];
    return (
        <div className="editPetModal">
            <div className="header">
                <IoCloseOutline onClick={props.onClose} className="closeButton" />
                <span className="title">Edição de Pet</span>
            </div>
            <div className="petInfos">
                <FormInput
                    id="nome"
                    name="nome"
                    label="Nome do Pet"
                    required
                // value={formValues.nome}
                />
                <div className="dropDownQuestions">
                    <DropDown
                        id="porte"
                        name="porte"
                        label="Porte"
                        options={porte}
                        required
                    // value={formValues.nome}
                    />
                    <div className="petAge">
                        <FormInput
                            id="idade"
                            name="idade"
                            label="Idade"
                            required
                        // value={formValues.nome}
                        />
                        <DropDown
                            id="Anos"
                            // name="Anos"
                            label="Anos"
                            options={idade}
                            required
                        // value={formValues.nome}
                        />
                    </div>
                </div>

                <FormInput
                    id="descricao"
                    name="descricao"
                    label="Descrição"
                    required
                    type="textarea"
                // value={formValues.nome}
                />
                <div className="petInfosCheckbox">
                    <span className="title">Sexo</span>
                    <div className="checkbox">
                        <input
                            type="radio"
                            name="femea"
                            value="femea"
                        />
                        <label>Fêmea</label>
                    </div>
                    <div className="checkbox">
                        <input
                            type="radio"
                            name="macho"
                            value="macho"
                        />
                        <label>Macho</label>
                    </div>
                </div>
            </div>
            <div className="bottomOpt">
                <button className="button1"></button>
                <button className="button2"></button>
            </div>
            <div className="next">
                <PrimaryButton text="Próximo" />
            </div>
        </div>
    );
}

export default FirstPetEdit;
