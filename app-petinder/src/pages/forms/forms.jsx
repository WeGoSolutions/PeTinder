import React, { useState } from 'react';
import styles from './forms.module.css';
import SecondaryButton from '../../components/SecondaryButton';
import PrimaryButton from '../../components/PrimaryButton';
import FormInput from '../../components/FormInput';


function Forms() {

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!image) {
            return;
        }

        const formData = new FormData();
        formData.append('image', image);
    };

    const [castradoVacinado, setcastradoVacinado] = useState({
        castrado: false,
        vacinado: false,
        nao: false,
    });

    const castradoVacinadoChange = (e) => {
        const { name, checked } = e.target;

        if (name === "nao") {
            setcastradoVacinado({
                castrado: false,
                vacinado: false,
                nao: checked,
            });
        } else {
            setcastradoVacinado((prev) => ({
                ...prev,
                [name]: checked,
                nao: checked ? false : prev.nao,
            }));
        }
    };

    const [tipoMoradia, setTipoMoradia] = useState("");
    const tipoMoradiaChange = (e) => {
        setTipoMoradia(e.target.value);
    };

    const [temAnimais, setTemAnimais] = useState("");
    const temAnimaisChange = (e) => {
        setTemAnimais(e.target.value);
    };

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

    const [formData, setFormData] = useState({
        nome: "",
        cpf: "",
        email: "",
        dtNasc: "",
        telefone: "",
        cep: "",
        rua: "",
        complemento: "",
        numero: "",
        cidade: "",
        uf: "",
        moradia: "",
        permiteAnimais: "",
        temQuintal: "",
        teveAnimais: "",
        cuidados: [],
        adaptacao: "",
    });

    const handleSave = () => {
        localStorage.setItem("formularioAdocao", JSON.stringify(formData));
    };


    return (
        <div className={styles.background}>
            <div className={styles.container}>
                <img src="./public/assets/closeButton.png" />
                <h1>Formulário de adoção</h1>
                <div className={styles.inputSection}>
                    <div className={styles.inputTitle}>
                        <span>Informações Pessoais</span> <span className={styles.asterisco}>*</span>
                    </div>

                    <FormInput
                        id="nome"
                        name="nome"
                        label="Nome"
                        required
                        // value={formValues.nome}
                        disabled={true}
                    />
                    <FormInput
                        id="cpf"
                        name="cpf"
                        label="CPF"
                        required
                        // value={formValues.cpf}
                        disabled={true}
                    />
                    <FormInput
                        id="email"
                        name="email"
                        label="Email"
                        required
                        // value={formValues.email}
                        disabled={true}
                    />

                    <div className={styles.inputAlign}>
                        <FormInput
                            id="dtNasc"
                            name="dtNasc"
                            label="Data de Nascimento"
                            required
                            className={styles.dtNasc}
                            // value={formValues.dtNasc}
                            disabled={true}
                        />
                        <FormInput
                            id="telefone"
                            name="telefone"
                            label="Telefone"
                            required
                            className={styles.telefone}
                            // value={formValues.telefone}
                            disabled={true}
                        />
                    </div>

                </div>
                <div className={styles.inputSection}>
                    <div className={styles.inputTitle}>
                        <span>Endereço</span><span className={styles.asterisco}>*</span>
                    </div>

                    <FormInput
                        id={styles.cep}
                        name="cep"
                        label="CEP"
                        required
                        // value={formValues.cep}
                        disabled={true}

                    />
                    <FormInput
                        id={styles.rua}
                        name="rua"
                        label="Rua"
                        required
                        // value={formValues.rua}
                        disabled={true}

                    />

                    <div className={styles.inputAlign}>
                        <FormInput
                            id="complemento"
                            name="complemento"
                            label="Complemento"
                            required
                            // value={formValues.complemento}
                            disabled={true}
                        />
                        <FormInput
                            id="numero"
                            name="numero"
                            label="Número"
                            required
                            // value={formValues.numero}
                            disabled={true}

                        />
                    </div>
                    <div className={styles.inputAlign}>
                        <FormInput
                            id="cidade"
                            name="cidade"
                            label="Cidade"
                            required
                            // value={formValues.cidade}
                            disabled={true}

                        />
                        <FormInput
                            id="uf"
                            name="uf"
                            label="UF"
                            required
                            // value={formValues.uf}
                            disabled={true}

                        />
                    </div>

                </div>
                <div className={styles.adicionalSection}>
                    <div className={styles.inputTitle}>
                        <span>Informações Adicionais</span> <span className={styles.asterisco}>*</span>
                    </div>

                    <div className={styles.checkboxContainer}>

                        <span>1. Qual o tipo de moradia que você se encontra nesse momento?</span>
                        <div className={styles.checkbox}>
                            <input
                                type="radio"
                                name="tipoMoradia"
                                value="apartamentoProprio"
                                onChange={tipoMoradiaChange}
                            />
                            <label>Apartamento próprio</label>
                        </div>

                        <div className={styles.checkbox}>
                            <input
                                type="radio"
                                name="tipoMoradia"
                                value="apartamentoAlugado"
                                onChange={tipoMoradiaChange}
                            />
                            <label>Apartamento alugado</label>
                        </div>

                        <div className={styles.checkbox}>
                            <input
                                type="radio"
                                name="tipoMoradia"
                                value="casaPropria"
                                onChange={tipoMoradiaChange}
                            />
                            <label>Casa própria</label>
                        </div>

                        <div className={styles.checkbox}>
                            <input
                                type="radio"
                                name="tipoMoradia"
                                value="casaAlugada"
                                onChange={tipoMoradiaChange}
                            />
                            <label>Casa alugada</label>
                        </div>

                    </div>

                    <div className={styles.checkboxContainer}>
                        {(tipoMoradia === "apartamentoAlugado" || tipoMoradia === "casaAlugada") && (
                            <div className={styles.checkboxContainer}>
                                <span>2. Você tem certeza que é permitido animais no imóvel?</span>
                                <div className={styles.checkbox}>
                                    <input type="radio" name="permitidoAnimais" value="sim" />
                                    <label>Sim, já verifiquei e tenho certeza.</label>
                                </div>
                                <div className={styles.checkbox}>
                                    <input type="radio" name="permitidoAnimais" value="nao" />
                                    <label>Não.</label>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className={styles.answerContainer}>
                        {(tipoMoradia == "casaPropria" || tipoMoradia == "casaAlugada") && (
                            <div className={styles.answerContainer}>
                                <span>
                                    3. O quintal é cercado? Não permitindo que o animal saia para a rua, mas podendo ficar solto no pátio? Ele terá acesso ao interior da residência? Conte-nos mais.
                                </span>
                                <br />
                                <textarea className={styles.answer} placeholder="RESPOSTA"></textarea>
                            </div>
                        )}

                    </div>

                    <div className={styles.checkboxContainer}>
                        <span>4. Tem ou já teve outros animais? </span>
                        <div className={styles.checkbox}>
                            <input
                                type="radio"
                                name="temAnimais"
                                value="sim"
                                onChange={temAnimaisChange}
                            />
                            <label>Sim.</label>
                        </div>

                        <div className={styles.checkbox}>
                            <input
                                type="radio"
                                name="temAnimais"
                                value="nao"
                                onChange={temAnimaisChange}
                            />
                            <label>Não.</label>
                        </div>
                    </div>

                    {(temAnimais === "sim") && (
                        <>
                            <div className={styles.checkboxContainer}>
                                <span>5. São castrados e vacinados?</span>
                                <div className={styles.checkbox}>
                                    <input
                                        type="checkbox"
                                        name="castrado"
                                        checked={castradoVacinado.castrado}
                                        onChange={castradoVacinadoChange}
                                    />
                                    <label>Castrado.</label>
                                </div>

                                <div className={styles.checkbox}>
                                    <input
                                        type="checkbox"
                                        name="vacinado"
                                        checked={castradoVacinado.vacinado}
                                        onChange={castradoVacinadoChange}
                                    />
                                    <label>Vacinado.</label>
                                </div>

                                <div className={styles.checkbox}>
                                    <input
                                        type="checkbox"
                                        name="nao"
                                        checked={castradoVacinado.nao}
                                        onChange={castradoVacinadoChange}
                                    />
                                    <label>Não.</label>
                                </div>
                            </div>

                            <div className={styles.answerContainer}>
                                <span>6. Se você tem outros animais atualmente, haverá espaço para prevenir uma briga territorial? Como será a adaptação?</span>
                                <br />
                                <textarea className={styles.answer} placeholder="RESPOSTA"></textarea>
                            </div>
                        </>
                    )}

                    <div className={styles.answerContainer}>
                        <span>7. Inclua 5 ou mais fotos que mostrem onde o novo Pet viverá.</span>
                        <br />
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

                    <div className={styles.confirmInfos}>
                        <input type="checkbox" />
                        <span>Eu confirmo que todas as informações descritas são verdadeiras.</span>
                    </div>

                    <div className={styles.buttonContainer}>
                        <span onClick={handleSave} >Salvar alterações</span>
                        <SecondaryButton text="Cancelar" />
                        <PrimaryButton text="Enviar" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Forms;