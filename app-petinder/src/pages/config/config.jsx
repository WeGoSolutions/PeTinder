import React from "react";
import FormInput from "../../components/FormInput";
import PrimaryButton from "../../components/PrimaryButton";
import styles from './config.module.css';
import SecondaryButton from "../../components/SecondaryButton";
import NavBar from "../../components/NavBar";
import DropDown from "../../components/DropDown";

function Config() {
    const ufs = ["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"];

    return (
        <div className={styles.background}>
            <div className={styles.fixed_top}>
                <NavBar />
            </div>
            <div className={styles.configContainer}>
                <div className={styles.sideMenu}>
                    <span className={styles.optionsTitle}> Configurações</span>
                    <div className={styles.optionsSection}>
                        <div className={styles.options}><span >Conta</span></div>
                        <div className={styles.options}><span >Acessibilidade</span></div>
                        <div className={styles.options}><span >Segurança</span></div>
                    </div>
                </div>
                <div className={styles.division}></div>
                <div className={styles.configInfos}>
                    <h2>Conta</h2>
                    <div className={styles.img}></div>
                    <div className={styles.containerForm}>
                        <div className={styles.configTextInfo1}>
                            <span className={styles.title}>Informações pessoais</span>
                            <FormInput
                                id="nome"
                                name="nome"
                                label="Nome Completo"
                            />
                            <FormInput
                                id="email"
                                name="email"
                                label="Email"
                            />
                            <FormInput
                                id="cpf"
                                name="cpf"
                                label="CPF"
                            />
                            <div className={styles.registerFormRow}>
                                <FormInput
                                    id="dataNasc"
                                    name="dataNasc"
                                    label="Data de Nascimento"
                                    type="date"
                                    required
                                // value={formValues.dataNasc}
                                // onChange={handleInputChange}
                                // error={errors.dataNasc}
                                />
                            </div>
                        </div>

                        <div className={styles.configTextInfo2}>
                            <span className={styles.title}>Endereço</span>
                            <FormInput
                                id="cep"
                                name="cep"
                                label="CEP"
                            />
                            <FormInput
                                id="rua"
                                name="rua"
                                label="Rua"
                            />
                            <div className={styles.inputDif}>
                                <div className={styles.bigInput}>
                                    <FormInput
                                        id="complemento"
                                        name="complemento"
                                        label="Complemento"
                                    />
                                    <FormInput
                                        id="cidade"
                                        name="cidade"
                                        label="Cidade"
                                    />
                                </div>
                                <div className={styles.litInput}>
                                    <FormInput
                                        id="numero"
                                        name="numero"
                                        label="Número"
                                    />
                                    <DropDown
                                        id="uf"
                                        name="uf"
                                        label="UF"
                                        options={ufs}
                                    // value={formValues.uf}
                                    // onChange={(e) => {
                                    //     const { value } = e.target;
                                    //     setFormValues((prevValues) => ({
                                    //         ...prevValues,
                                    //         uf: value,
                                    //     }));
                                    // }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.buttons}>
                        <PrimaryButton text="Salvar" />
                        <div className={styles.secondaryButton}>
                            <SecondaryButton text="Cancelar" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Config;