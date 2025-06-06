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
import { url } from "../../provider/apiInstance";
import Toast from "../../components/Toast";

function Config() {
    const ufs = ["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"];

    const [toast, setToast] = useState({ mensagem: '', tipo: 'sucesso' });

    const [errors, setErrors] = useState({});

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
        url.get(`/users/${userId}`)
            .then(res => {
                const data = res.data;

                const maskCPF = (value) => {
                    return (value || "")
                        .replace(/\D/g, "")
                        .slice(0, 11)
                        .replace(/(\d{3})(\d)/, "$1.$2")
                        .replace(/(\d{3})(\d)/, "$1.$2")
                        .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
                };

                const maskCEP = (value) => {
                    return (value || "")
                        .replace(/\D/g, "")
                        .slice(0, 8)
                        .replace(/(\d{5})(\d{1,3})$/, "$1-$2");
                };

                const loadedValues = {
                    nome: data.nome || "",
                    email: data.email || "",
                    cpf: maskCPF(data.cpf),
                    dataNasc: data.dataNasc || "",
                    cep: maskCEP(data.cep) || "",
                    rua: data.rua || "",
                    complemento: data.complemento || "",
                    numero: data.numero || "",
                    cidade: data.cidade || "",
                    uf: data.uf || "",
                    imagemUrl: data.imagemUrl || ""
                };
                setFormValues(loadedValues);
                setInitialValues(loadedValues); // Salva os valores iniciais
            })
            .catch(err => {
                console.error("Erro ao buscar dados do usuário:", err);
            });
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
            newErrors.novaSenha = "A nova senha é obrigatória.";
            setErrorStyle("novaSenha");
        } else if (!tamanhoValido) {
            newErrors.novaSenha = "A senha deve ter pelo menos 8 caracteres.";
            setErrorStyle("novaSenha");
        } else if (!temLetraMaiuscula) {
            newErrors.novaSenha = "A senha deve conter pelo menos uma letra maiúscula.";
            setErrorStyle("novaSenha");
        } else if (!temLetraMinuscula) {
            newErrors.novaSenha = "A senha deve conter pelo menos uma letra minúscula.";
            setErrorStyle("novaSenha");
        } else if (!temSimbolo) {
            newErrors.novaSenha = "A senha deve conter pelo menos um símbolo.";
            setErrorStyle("novaSenha");
        } else {
            resetInputStyle("novaSenha");
        }

        if (!confirmar.trim()) {
            newErrors.confirmarSenha = "A confirmação de senha é obrigatória.";
            setErrorStyle("confirmarSenha");
        } else if (senha && confirmar && senha !== confirmar) {
            newErrors.confirmarSenha = "As senhas devem coincidir.";
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
            alert("A nova senha e a confirmação não coincidem.");
            return;
        }

        try {
            await url.patch(`/users/${userId}/senha`, {
                senhaAtual: formValuesSenha.senhaAtual,
                novaSenha: formValuesSenha.novaSenha
            });

            setToast({ mensagem: 'Senha atualizada com sucesso!', tipo: 'sucesso' });
            setFormValuesSenha({
                senhaAtual: "",
                novaSenha: "",
                confirmarSenha: ""
            });

            setTimeout(() => {
                navigate('/login');
            }, 2000);

        } catch (error) {
            console.error("Erro ao atualizar a senha:", error);

            let newErrors = {};
            if (error.response && error.response.status === 409) {
                newErrors.senhaAtual = "Senha atual incorreta.";
                setErrorStyle("senhaAtual");
                // setToast({ mensagem: 'Senha atual incorreta', tipo: 'erro' });
            }

            setErrors(prev => ({
                ...prev,
                ...newErrors
            }));
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
            dataNasc: formValues.dataNasc,
            cep: cepSemMascara,
            rua: formValues.rua,
            numero: formValues.numero,
            cidade: formValues.cidade,
            uf: formValues.uf,
            complemento: formValues.complemento,
        };

        try {
            await url.patch(`/users/${userId}`, payload);
            sessionStorage.setItem("userName", formValues.nome);
            setToast({ mensagem: 'Dados atualizados com sucesso!', tipo: 'sucesso' });
            //tirar talvez, se não quiser o reload automático
            setTimeout(() => {
                window.location.reload();
            }, 1500);
            setJustSaved(true); // Bloqueia edição após salvar
        } catch (error) {
            console.error("Erro ao atualizar dados da ONG:", error);
            setToast({ mensagem: 'Erro ao atualizar dados.', tipo: 'erro' });
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
            setToast({ mensagem: "O email é obrigatório.", tipo: "erro" });
            return false;
        } else if (email.includes(" ")) {
            setToast({ mensagem: "O email não pode conter espaços.", tipo: "erro" });
            return false;
        } else if (contemAcento) {
            setToast({ mensagem: "O email não pode conter acentos.", tipo: "erro" });
            return false;
        } else if (!emailValido) {
            setToast({ mensagem: "Formato de email inválido.", tipo: "erro" });
            return false;
        }
        return true;
    };

    const validateNome = () => {
        const nome = formValues.nome.trim();

        if (!nome) {
            setToast({ mensagem: "O nome é obrigatório.", tipo: "erro" });
            return false;
        } else if (nome.length < 3) {
            setToast({ mensagem: "O nome deve ter pelo menos 3 caracteres.", tipo: "erro" });
            return false;
        } else if (/[^a-zA-ZÀ-ÿ\s]/.test(nome)) {
            setToast({ mensagem: "O nome não deve conter símbolos ou caracteres especiais.", tipo: "erro" });
            return false;
        }
        return true;
    };

    return (
        <div className={styles.background}>
            <div className={styles.fixed_top}>
                <NavBar showButtonIndex={3} />
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
                                    label="Nome Completo"
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
                                    label="Email"
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
                                    label="CPF"
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
                                        label="Data de Nascimento"
                                        type="date"
                                        required
                                        value={formValues.dataNasc}
                                        disabled={isFieldDisabled("dataNasc") || justSaved}
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
                                    onChange={handleFormChange}
                                    disabled={false}
                                />
                                <FormInput
                                    id="rua"
                                    name="rua"
                                    label="Rua"
                                    value={formValues.rua}
                                    onChange={handleFormChange}
                                    disabled={false}
                                />
                                <div className={styles.inputDif}>
                                    <div className={styles.bigInput}>
                                        <FormInput
                                            id="complemento"
                                            name="complemento"
                                            label="Complemento"
                                            value={formValues.complemento}
                                            onChange={handleFormChange}
                                            disabled={false}
                                        />
                                        <FormInput
                                            id="cidade"
                                            name="cidade"
                                            label="Cidade"
                                            value={formValues.cidade}
                                            onChange={handleFormChange}
                                            disabled={false}
                                        />
                                    </div>
                                    <div className={styles.litInput}>
                                        <FormInput
                                            id="numero"
                                            name="numero"
                                            label="Número"
                                            value={formValues.numero}
                                            onChange={handleFormChange}
                                            disabled={false}
                                        />
                                        <DropDown
                                            id="uf"
                                            name="uf"
                                            label="UF"
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
        </div>
    )
}
export default Config;