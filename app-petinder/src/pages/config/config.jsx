import React, { useEffect, useState } from "react";
import axios from "axios";
import FormInput from "../../components/FormInput";
import PrimaryButton from "../../components/PrimaryButton";
import styles from './config.module.css';
import SecondaryButton from "../../components/SecondaryButton";
import NavBar from "../../components/NavBar";
import DropDown from "../../components/DropDown";
import UserImage from "../../components/UserImage";
import HiperLink from "../../components/HiperLink";
import Modal from "../../components/Modal";
import GenericModal from "../../components/GenericModal"
import { IoMdInformationCircleOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { url } from "../../provider/apiInstance";
import reqs from "../../reqs";
import Toast from "../../components/Toast";
import Strings from "../../utils/strings"

function Config() {
    const ufs = ["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"];

    const [toast, setToast] = useState({ mensagem: '', tipo: 'sucesso' });
    const [openModal, setOpenModal] = useState(false);
    const [deleteAccount, setDeleteAccount] = useState(false);

    const [errors, setErrors] = useState({});
    const closeDeleteModal = () => setDeleteAccount(false);

    const [formValues, setFormValues] = useState({
        nome: "",
        email: "",
        cpf: "",
        dataNascimento: "",
        cep: "",
        rua: "",
        complemento: "",
        numero: "",
        cidade: "",
        uf: "",
        imagemUrl: ""
    });

    // Estado para controlar se os campos já foram preenchidos (não podem ser editados)
    const isFieldDisabled = (field) => {
        // Só desabilita se o campo já tinha valor ao carregar a tela OU se acabou de salvar
        return (initialValues[field] && initialValues[field] !== "") || justSaved;
    };

    // Salva os valores iniciais ao carregar os dados do usuário
    const [initialValues, setInitialValues] = useState({});

    useEffect(() => {
        const userId = sessionStorage.getItem("userId");
        if (!userId) return;

        const fetchUserData = async () => {
            const result = await reqs.getUserDataConfig(userId);
            if (result.success) {
                setFormValues(result.data);
                setInitialValues(result.data); // Salva os valores iniciais
            } else {
                console.error(Strings.erroBuscaUser, result.error);
            }
        };

        fetchUserData();
    }, []);

    const [seguranca, setSeguranca] = useState(false);

    const handleGoBack = () => {
        window.history.back();
    };

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

        if (errors[name]) {
            resetInputStyle(name);
            setErrors((prevErrors) => {
                const updatedErrors = { ...prevErrors };
                delete updatedErrors[name];
                return updatedErrors;
            });
        }
    };

    const validatePasswords = () => {
        let newErrors = {};
        const senha = formValuesSenha.novaSenha;
        const confirmar = formValuesSenha.confirmarSenha;

        const temLetraMaiuscula = /[A-Z]/.test(senha);
        const temLetraMinuscula = /[a-z]/.test(senha);
        const temSimbolo = /[^A-Za-z0-9]/.test(senha);
        const tamanhoValido = senha.length >= 8;

        if (!senha.trim()) {
            newErrors.novaSenha = Strings.erroSenha7;
            setErrorStyle("novaSenha");
        } else if (!tamanhoValido) {
            newErrors.novaSenha = Strings.erroSenha2;
            setErrorStyle("novaSenha");
        } else if (!temLetraMaiuscula) {
            newErrors.novaSenha = Strings.erroSenha3;
            setErrorStyle("novaSenha");
        } else if (!temLetraMinuscula) {
            newErrors.novaSenha = Strings.erroSenha4;
            setErrorStyle("novaSenha");
        } else if (!temSimbolo) {
            newErrors.novaSenha = Strings.erroSenha5;
            setErrorStyle("novaSenha");
        } else {
            resetInputStyle("novaSenha");
        }

        if (!confirmar.trim()) {
            newErrors.confirmarSenha = Strings.erroSenha8;
            setErrorStyle("confirmarSenha");
        } else if (senha && confirmar && senha !== confirmar) {
            newErrors.confirmarSenha = Strings.erroSenha6;
            setErrorStyle("novaSenha");
            setErrorStyle("confirmarSenha");
        } else {
            resetInputStyle("confirmarSenha");
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const setErrorStyle = (id) => {
        const inputElement = document.getElementById(id);
        if (inputElement) {
            inputElement.style.border = "2px solid red";
            inputElement.closest(".input-container")?.classList.add("error");
        }
    };

    const resetInputStyle = (id) => {
        const inputElement = document.getElementById(id);
        if (inputElement) {
            inputElement.style.border = "2px solid black";
            inputElement.closest(".input-container")?.classList.remove("error");
        }
    };

    const changePassword = async () => {
        if (!validatePasswords()) return;

        const userId = sessionStorage.getItem("userId");
        if (!userId) return;

        if (formValuesSenha.novaSenha !== formValuesSenha.confirmarSenha) {
            return;
        }

        const result = await reqs.changePasswordConfig(
            userId,
            formValuesSenha.senhaAtual,
            formValuesSenha.novaSenha
        );

        if (result.success) {
            setToast({ mensagem: Strings.senhaSucesso, tipo: 'sucesso' });
            setFormValuesSenha({
                senhaAtual: "",
                novaSenha: "",
                confirmarSenha: ""
            });

            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } else {
            console.error("Erro ao atualizar a senha:", result.error);

            let newErrors = {};
            if (result.errorType === "wrongCurrentPassword") {
                newErrors.senhaAtual = Strings.erroSenha9;
                setErrorStyle("senhaAtual");
                // setToast({ mensagem: 'Senha atual incorreta', tipo: 'erro' });
            }

            setErrors(prev => ({
                ...prev,
                ...newErrors
            }));
        }
    };

    const deleteUserAccount = async () => {
        const userId = sessionStorage.getItem("userId");
        if (!userId) return;

        const result = await reqs.deleteUserAccountConfig(userId);

        if (result.success) {
            // Opcional: Limpar dados do usuário e redirecionar
            sessionStorage.clear();
            window.location.href = "/";
        } else {
            setToast({ mensagem: "Erro ao deletar conta.", tipo: "erro" });
            console.error("Erro ao deletar conta:", result.error);
        }
    };

    const [justSaved, setJustSaved] = useState(false);

    const handleSave = async () => {
        const userId = sessionStorage.getItem("userId");
        if (!userId) return;

        const cpfSemMascara = formValues.cpf.replace(/\D/g, "");
        const cepSemMascara = formValues.cep.replace(/\D/g, "");

        const payload = {
            nome: formValues.nome,
            email: formValues.email,
            cpf: cpfSemMascara,
            dataNascimento: formValues.dataNascimento,
            cep: cepSemMascara,
            rua: formValues.rua,
            numero: formValues.numero,
            cidade: formValues.cidade,
            uf: formValues.uf,
            complemento: formValues.complemento,
        };

        const result = await reqs.updateUserDataConfig(userId, payload, formValues.nome);

        if (result.success) {
            sessionStorage.setItem("userName", formValues.nome);
            setToast({ mensagem: Strings.sucessoAtualizacao, tipo: 'sucesso' });
            //tirar talvez, se não quiser o reload automático
            setTimeout(() => {
                window.location.reload();
            }, 1500);
            setJustSaved(true); // Bloqueia edição após salvar
        } else {
            console.error("Erro ao atualizar dados do usuário:", result.error);

            if (result.error?.response?.status === 409) {
                setToast({ mensagem: Strings.erroAtualizacaoCPF, tipo: 'erro' });
            } else {
                setToast({ mensagem: Strings.erroAtualizacao, tipo: 'erro' });
            }
        }
    };

    const handleFormChange = async (e) => {
        const { name, value } = e.target;
        let newValue = value;

        if (name === "cep") {
            newValue = value;
            setFormValues((prev) => ({
                ...prev,
                cep: newValue
            }));

            if (newValue.replace(/\D/g, "").length === 8) {
                try {
                    const response = await fetch(`https://viacep.com.br/ws/${newValue.replace(/\D/g, "")}/json/`);
                    const data = await response.json();
                    if (!data.erro) {
                        setFormValues((prev) => ({
                            ...prev,
                            rua: data.logradouro || prev.rua,
                            cidade: data.localidade || prev.cidade,
                            uf: data.uf || prev.uf,
                        }));
                    }
                } catch (error) {
                    console.error("Erro ao buscar o CEP:", error);
                }
            }
            return;
        }
        setFormValues((prev) => ({
            ...prev,
            [name]: newValue
        }));
    };


    const validateEmail = () => {
        const email = formValues.email;
        const contemAcento = /[^\u0000-\u007F]/.test(email);
        const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

        if (!email.trim()) {
            setToast({ mensagem: Strings.erroEmail1, tipo: "erro" });
            return false;
        } else if (email.includes(" ")) {
            setToast({ mensagem: Strings.erroEmail2, tipo: "erro" });
            return false;
        } else if (contemAcento) {
            setToast({ mensagem: Strings.erroEmail3, tipo: "erro" });
            return false;
        } else if (!emailValido) {
            setToast({ mensagem: Strings.erroEmail4, tipo: "erro" });
            return false;
        }
        return true;
    };

    const validateNome = () => {
        const nome = formValues.nome.trim();

        if (!nome) {
            setToast({ mensagem: Strings.erroNome1, tipo: "erro" });
            return false;
        } else if (nome.length < 3) {
            setToast({ mensagem: Strings.erroNome2, tipo: "erro" });
            return false;
        } else if (/[^a-zA-ZÀ-ÿ\s]/.test(nome)) {
            setToast({ mensagem: Strings.erroNome3, tipo: "erro" });
            return false;
        }
        return true;
    };

    return (
        <div className={styles.background}>
            <div className={styles.fixed_top}>
                <NavBar showButtonIndex={4} />
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
                        <div className={getOptionClass(seguranca)} onClick={() => setSeguranca(true)}>
                            <span>Segurança</span>
                        </div>
                    </div>
                </div>
                <div className={styles.division}></div>

                {seguranca ? (
                    <div className={styles.segurancaContainer}>
                        <div className={styles.toast}>
                            <div className="toastContainer">
                                {toast.mensagem && (
                                    <Toast
                                        mensagem={toast.mensagem}
                                        tipo={toast.tipo}
                                        onClose={() => setToast({ mensagem: '', tipo: 'sucesso' })}
                                    />
                                )}
                            </div>
                        </div>
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
                                error={errors.senhaAtual}
                            />
                            <h3><IoMdInformationCircleOutline size={14} /> Esqueceu sua senha atual? Faça o processo de
                                <div onClick={() => setOpenModal(true)}>
                                    <HiperLink
                                        href="#"
                                        label="“Esqueci a senha”"
                                        haveDecoration={true}
                                    />
                                </div>
                            </h3>
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
                                error={errors.novaSenha}
                            />

                            <FormInput
                                id="confirmarSenha"
                                name="confirmarSenha"
                                label="Confirmar senha"
                                type="password"
                                value={formValuesSenha.confirmarSenha}
                                onChange={handleChange}
                                required
                                error={errors.confirmarSenha}
                            />
                        </div>

                        <div className={styles.buttonsAct}>
                            <div className={styles.deleteAccount}
                                onClick={() => setDeleteAccount(true)}>
                                <HiperLink
                                    href="#"
                                    label="Deletar Conta"
                                    haveDecoration={false}
                                />
                            </div>
                            <div onClick={changePassword}>
                                <PrimaryButton type="button" text="Salvar" />
                            </div>
                        </div>
                    </div>
                ) : (

                    <div className={styles.configInfos}>
                        <div className={styles.toast}>
                            <div className="toastContainer">
                                {toast.mensagem && (
                                    <Toast
                                        mensagem={toast.mensagem}
                                        tipo={toast.tipo}
                                        onClose={() => setToast({ mensagem: '', tipo: 'sucesso' })}
                                    />
                                )}
                            </div>
                        </div>
                        <h2>Conta</h2>
                        <div className={styles.img}>
                            <UserImage size={180} src={formValues.imagemUrl} hasEdit={true} />
                        </div>
                        <div className={styles.containerForm}>
                            <div className={styles.configTextInfo1}>
                                <span className={styles.title}>Informações pessoais</span>
                                <FormInput
                                    id="nome"
                                    name="nome"
                                    label={Strings.nome}
                                    value={formValues.nome}
                                    // disabled={isFieldDisabled("nome") || justSaved}
                                    disabled={false}
                                    onChange={(e) =>
                                        setFormValues(prev => ({
                                            ...prev,
                                            [e.target.name]: e.target.value,
                                        }))
                                    }
                                />
                                <FormInput
                                    id="email"
                                    name="email"
                                    label={Strings.email}
                                    value={formValues.email}
                                    disabled={false}
                                    onChange={(e) => {
                                        setFormValues(prev => ({
                                            ...prev,
                                            [e.target.name]: e.target.value,
                                        }));
                                        // Limpa erro visual ao digitar
                                        const inputElement = document.getElementById("email");
                                        if (inputElement) {
                                            inputElement.style.border = "2px solid black";
                                            inputElement.closest(".input-container")?.classList.remove("error");
                                        }
                                    }}
                                    error={undefined}
                                />
                                <FormInput
                                    id="cpf"
                                    name="cpf"
                                    label={Strings.cpf}
                                    value={formValues.cpf}
                                    onChange={(e) => setFormValues(prev => ({
                                        ...prev,
                                        cpf: e.target.value // já vem mascarado do FormInput
                                    }))}
                                    disabled={isFieldDisabled("cpf")}
                                />

                                <div className={styles.registerFormRow}>
                                    <FormInput
                                        id="dataNasc"
                                        name="dataNasc"
                                        label={Strings.dataNasc}
                                        type="date"
                                        required
                                        value={formValues.dataNascimento}
                                        disabled={isFieldDisabled("dataNascimento") || justSaved}
                                    />
                                </div>
                            </div>

                            <div className={styles.configTextInfo2}>
                                <span className={styles.title}>Endereço</span>
                                <FormInput
                                    id="cep"
                                    name="cep"
                                    label={Strings.cep}
                                    value={formValues.cep}
                                    onChange={handleFormChange}
                                    disabled={false}
                                />
                                <FormInput
                                    id="rua"
                                    name="rua"
                                    label={Strings.rua}
                                    value={formValues.rua}
                                    onChange={handleFormChange}
                                    disabled={false}
                                />
                                <div className={styles.inputDif}>
                                    <div className={styles.bigInput}>
                                        <FormInput
                                            id="complemento"
                                            name="complemento"
                                            label={Strings.complemento}
                                            value={formValues.complemento}
                                            onChange={handleFormChange}
                                            disabled={false}
                                        />
                                        <FormInput
                                            id="cidade"
                                            name="cidade"
                                            label={Strings.cidade}
                                            value={formValues.cidade}
                                            onChange={handleFormChange}
                                            disabled={false}
                                        />
                                    </div>
                                    <div className={styles.litInput}>
                                        <FormInput
                                            id="numero"
                                            name="numero"
                                            label={Strings.numero}
                                            value={formValues.numero}
                                            onChange={handleFormChange}
                                            disabled={false}
                                        />
                                        <DropDown
                                            id="uf"
                                            name="uf"
                                            label={Strings.uf}
                                            options={ufs}
                                            value={formValues.uf}
                                            onChange={handleFormChange}
                                            disabled={false}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.buttons}>
                            <div onClick={() => {
                                if (validateNome() && validateEmail()) handleSave();
                            }}>
                                <PrimaryButton text="Salvar" />
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <Modal isOpen={openModal} setModalOpen={() => setOpenModal(!openModal)} onCloseAll={() => setOpenModal(false)} />
            {deleteAccount > 0 && (
                <GenericModal
                    isOpen={deleteAccount > 0}
                    onClose={closeDeleteModal}
                    width="600px"
                    height="26rem"
                    title="Deletar Conta"
                >
                    <>
                        <div className={styles.deleteInfo}>
                            <div className={styles.deleteArea}>
                                <div className={styles.deleteImage}>
                                    <img src="/delete.png" />
                                </div>
                                <div className={styles.deleteText}>
                                    <p>Tem certeza de que deseja excluir sua conta?</p>
                                    <p>Esta ação é irreversível e todos os seus dados serão permanentemente apagados.</p>
                                </div>
                            </div>
                            <div className={styles.next}>
                                <div className={styles.secondary} onClick={deleteUserAccount}>
                                    <SecondaryButton text="Deletar" />
                                </div>
                                <div onClick={closeDeleteModal}>
                                    <PrimaryButton text="Cancelar" />
                                </div>
                            </div>
                        </div>
                    </>
                </GenericModal>
            )}
        </div >
    )
}
export default Config;