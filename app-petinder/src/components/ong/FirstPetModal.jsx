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
                <span className="title">{props.modo} do Pet</span>
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
                <div className="desc">
                    <span>Descrição</span>
                    <textarea id="descricao" placeholder="DESCRIÇÃO"></textarea>
                </div>
            
                <div className="petInfosCheckbox">
                    <span className="title">Sexo</span>
                    <div className="checkbox">
                        <input
                            type="radio"
                            name="sexo"
                            value="femea"
                        />
                        <label htmlFor="femea">Fêmea</label>
                    </div>
                    <div className="checkbox">
                        <input
                            type="radio"
                            name="sexo"
                            value="macho"
                        />
                        <label htmlFor="macho">Macho</label>
                    </div>
                </div>
            </div>
            <div className="bottomOpt">
                <button className="button1"></button>
                <button className="button2"></button>
            </div>
            <div className="next">
                <div onClick={() => {
                    props.onNext();
                }}>
                    <PrimaryButton text="Próximo" />
                </div>

            </div>
        </div>
    );
}

export default FirstPetEdit;
