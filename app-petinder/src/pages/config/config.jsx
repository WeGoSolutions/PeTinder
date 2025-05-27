import React, { useEffect, useState } from "react";
import axios from "axios";
import FormInput from "../../components/FormInput";
import PrimaryButton from "../../components/PrimaryButton";
import styles from './config.module.css';
import SecondaryButton from "../../components/SecondaryButton";
import NavBar from "../../components/NavBar";
import DropDown from "../../components/DropDown";
import UserImage from "../../components/UserImage";

function Config() {
    const ufs = ["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"];

    const [formValues, setFormValues] = useState({
        nome: "",
        email: "",
        cpf: "",
        dataNasc: "",
        cep: "",
        rua: "",
        complemento: "",
        numero: "",
        cidade: "",
        uf: "",
        imagemUrl: ""
    });

    useEffect(() => {
        const userId = sessionStorage.getItem("userId");
        if (!userId) return;
        axios.get(`http://localhost:8080/users/${userId}`)
            .then(res => {
                const data = res.data;
                setFormValues({
                    nome: data.nome || "",
                    email: data.email || "",
                    cpf: data.cpf || "",
                    dataNasc: data.dataNasc || "",
                    cep: data.cep || "",
                    rua: data.rua || "",
                    complemento: data.complemento || "",
                    numero: data.numero || "",
                    cidade: data.cidade || "",
                    uf: data.uf || "",
                    imagemUrl: data.imagemUrl || ""
                });
            })
            .catch(err => {
                console.error("Erro ao buscar dados do usuário:", err);
            });
    }, []);

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
                    <div className={styles.img}>
                        <UserImage size={180} src={formValues.imagemUrl}/>
                    </div>
                    <div className={styles.containerForm}>
                        <div className={styles.configTextInfo1}>
                            <span className={styles.title}>Informações pessoais</span>
                            <FormInput
                                id="nome"
                                name="nome"
                                label="Nome Completo"
                                value={formValues.nome}
                            // onChange={...}
                            />
                            <FormInput
                                id="email"
                                name="email"
                                label="Email"
                                value={formValues.email}
                            // onChange={...}
                            />
                            <FormInput
                                id="cpf"
                                name="cpf"
                                label="CPF"
                                value={formValues.cpf}
                            // onChange={...}
                            />
                            <div className={styles.registerFormRow}>
                                <FormInput
                                    id="dataNasc"
                                    name="dataNasc"
                                    label="Data de Nascimento"
                                    type="date"
                                    required
                                    value={formValues.dataNasc}
                                // onChange={...}
                                />
                            </div>
                        </div>

                        <div className={styles.configTextInfo2}>
                            <span className={styles.title}>Endereço</span>
                            <FormInput
                                id="cep"
                                name="cep"
                                label="CEP"
                                value={formValues.cep}
                            // onChange={...}
                            />
                            <FormInput
                                id="rua"
                                name="rua"
                                label="Rua"
                                value={formValues.rua}
                            // onChange={...}
                            />
                            <div className={styles.inputDif}>
                                <div className={styles.bigInput}>
                                    <FormInput
                                        id="complemento"
                                        name="complemento"
                                        label="Complemento"
                                        value={formValues.complemento}
                                    // onChange={...}
                                    />
                                    <FormInput
                                        id="cidade"
                                        name="cidade"
                                        label="Cidade"
                                        value={formValues.cidade}
                                    // onChange={...}
                                    />
                                </div>
                                <div className={styles.litInput}>
                                    <FormInput
                                        id="numero"
                                        name="numero"
                                        label="Número"
                                        value={formValues.numero}
                                    // onChange={...}
                                    />
                                    <DropDown
                                        id="uf"
                                        name="uf"
                                        label="UF"
                                        options={ufs}
                                        value={formValues.uf}
                                    // onChange={...}
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