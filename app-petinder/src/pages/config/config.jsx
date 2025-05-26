import React, { useEffect, useState } from "react";
import axios from "axios";
import FormInput from "../../components/FormInput";
import PrimaryButton from "../../components/PrimaryButton";
import styles from './config.module.css';
import SecondaryButton from "../../components/SecondaryButton";
import NavBar from "../../components/NavBar";
import DropDown from "../../components/DropDown";
import UserImage from "../../components/UserImage";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";

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

    const [seguranca, setSeguranca] = useState(false);

    const handleGoBack = () => {
        window.history.back();
    };

    // Função para retornar a classe do botão de menu lateral
    const getOptionClass = (isActive) => {
        return `${styles.options} ${isActive ? styles.Botaoativo : ""}`;
    };


    const navigate = useNavigate();

    const [formValuesSenha, setFormValuesSenha] = useState({
        senhaAtual: "",
        novaSenha: "",
        confirmarSenha: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValuesSenha(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = () => {
        const userId = sessionStorage.getItem("userId");
        if (!userId) return;

        if (formValuesSenha.novaSenha !== formValuesSenha.confirmarSenha) {
            alert("A nova senha e a confirmação não coincidem.");
            return;
        }

        axios.patch(`http://localhost:8080/users/${userId}/senha`, {
            senhaAtual: formValuesSenha.senhaAtual,
            novaSenha: formValuesSenha.novaSenha
        })
            .then(() => {
                alert("Senha alterada com sucesso!");
                setFormValuesSenha({
                    senhaAtual: "",
                    novaSenha: "",
                    confirmarSenha: ""
                });

                //POR UM NAVIGATE PARA A PÁGINA DE LOGIN
            })
            .catch(err => {
                console.error("Erro ao atualizar senha:", err);
                alert("Erro ao atualizar senha. Verifique se a senha atual está correta.");
            });
    };


    // FAZER A LÓGICA DE ATUALIZAÇÃO DOS DADOS DA ONG

    return (
        <div className={styles.background}>
            <div className={styles.fixed_top}>
                <NavBar />
            </div>
            <div className={styles.configContainer}>
                <div className={styles.sideMenu}>
                    <div className={styles.optionsTitle}>
                        <img src="/left.png" onClick={handleGoBack} />
                        <span> Configurações</span>
                    </div>

                    <div className={styles.optionsSection}>
                        <div className={getOptionClass(!seguranca)} onClick={() => setSeguranca(false)}>
                            <span>Conta</span>
                        </div>
                        <div className={getOptionClass(false)} onClick={() => setSeguranca(false)}>
                            <span>Acessibilidade</span>
                        </div>
                        <div className={getOptionClass(seguranca)} onClick={() => setSeguranca(true)}>
                            <span>Segurança</span>
                        </div>
                    </div>
                </div>
                <div className={styles.division}></div>

                {seguranca ? (
                    <div className={styles.segurancaContainer}>
                        <div className={styles.segurancaTitle}>
                            <h1>Segurança</h1>
                            <h4>Mudança de senha</h4>
                        </div>

                        <div className={styles.senhaAtual}>
                            <FormInput
                                id="senhaAtual"
                                name="senhaAtual"
                                label="Senha atual"
                                type="password"
                                value={formValuesSenha.senhaAtual}
                                onChange={handleChange}
                                required
                            />
                            <h3><IoMdInformationCircleOutline size={14} /> Esqueceu sua senha atual? Faça o processo de “Esqueci a senha” na tela de Login.</h3>
                        </div>

                        <div className={styles.inputSenhas}>
                            <FormInput
                                id="novaSenha"
                                name="novaSenha"
                                label="Nova senha"
                                type="password"
                                value={formValuesSenha.novaSenha}
                                onChange={handleChange}
                                required
                            />

                            <FormInput
                                id="confirmarSenha"
                                name="confirmarSenha"
                                label="Confirmar senha"
                                type="password"
                                value={formValuesSenha.confirmarSenha}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className={styles.buttonsAct}>
                            <div onClick={handleSubmit}>
                    <SecondaryButton type="button" text="Salvar"/>
                </div>
                        </div>
                    </div>
                ) : (
                    <div className={styles.configInfos}>
                        <h2>Conta</h2>
                        <div className={styles.img}>
                            <UserImage size={180} src={formValues.imagemUrl} />
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
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
export default Config;