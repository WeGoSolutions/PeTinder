import React, { useEffect, useState } from "react";
import FormInput from "../../../components/FormInput";
import PrimaryButton from "../../../components/PrimaryButton";
import "../../../components/components.css";
import DropDown from "../../../components/DropDown";
import UserImage from "../../../components/UserImage";
import { formatarCPF, formatarCNPJ, formatarCEP } from "../../../utils/utils";
import axios from "axios";
import { url } from "../../../provider/apiInstance";
import reqs from "../../../reqs";
import Toast from "../../../components/Toast";
import Strings from "../../../utils/strings"


export default function Configuracao() {
    const ufs = ["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"];
    const [tipoDocumento, setTipoDocumento] = useState("CNPJ");
    const [toast, setToast] = useState({ mensagem: '', tipo: 'sucesso' });
    const [cpfCnpj, setCpfCnpj] = useState("");

    const [urlImage, setUrlImage] = useState("");

    const handleCpfCnpjChange = (e) => {
        let value = e.target.value.replace(/\D/g, "");
        if (tipoDocumento === "CPF") {
            if (value.length > 11) value = value.slice(0, 11);
            setFormValues((prev) => ({ ...prev, cpf: formatarCPF(value) }));
        } else {
            if (value.length > 14) value = value.slice(0, 14);
            setFormValues((prev) => ({ ...prev, cnpj: formatarCNPJ(value) }));
        }
    };

    const [formValues, setFormValues] = useState({
        nomeOng: "",
        email: "",
        cpf: "",
        cnpj: "",
        link: "",
        cep: "",
        rua: "",
        complemento: "",
        numero: "",
        cidade: "",
        uf: "",
    });

    const [initialCpf, setInitialCpf] = useState("");
    const [initialCnpj, setInitialCnpj] = useState("");

    useEffect(() => {
        const ongId = sessionStorage.getItem("ongId");
        if (!ongId) return;
        
        const fetchOngImage = async () => {
            const result = await reqs.getOngImageConfig(ongId);
            if (result.success) {
                setUrlImage(result.imageUrl);
            } else {
                console.error("Erro ao buscar imagem da ONG:", result.error);
            }
        };
        
        fetchOngImage();
    }, [])

    useEffect(() => {
        const ongId = sessionStorage.getItem("ongId");
        if (!ongId) return;
        
        const fetchOngData = async () => {
            const result = await reqs.listarInfosDaOngEmConfig(ongId);
            if (result.success) {
                const data = result.data;
                const endereco = data.endereco || {};

                let cepFormatado = "";
                let cpfFormatado = "";
                let cnpjFormatado = "";

                if (endereco.cep) {
                    let value = endereco.cep.replace(/\D/g, "");
                    if (value.length > 8) value = value.slice(0, 8);
                    cepFormatado = formatarCEP(value);
                }

                if (data.cpf) {
                    let value = data.cpf.replace(/\D/g, "");
                    if (value.length > 11) value = value.slice(0, 11);
                    cpfFormatado = formatarCPF(value);
                }

                if (data.cnpj) {
                    let value = data.cnpj.replace(/\D/g, "");
                    if (value.length > 14) value = value.slice(0, 14);
                    cnpjFormatado = formatarCNPJ(value);
                }

                setFormValues({
                    nomeOng: data.nome || "",
                    cnpj: cnpjFormatado,
                    cpf: cpfFormatado,
                    email: data.email || "",
                    link: data.link || "",

                    cep: cepFormatado || "",
                    rua: endereco.rua || "",
                    numero: endereco.numero || "",
                    cidade: endereco.cidade || "",
                    uf: endereco.uf || "",
                    complemento: endereco.complemento || "",
                    imagemUrl: data.imagemUrl || ""
                });
                setInitialCpf(cpfFormatado);
                setInitialCnpj(cnpjFormatado);
            } else {
                console.error("Erro ao buscar dados da ONG:", result.error);
            }
        };
        
        fetchOngData();
    }, []);

    function validateNome() {
        const nome = formValues.nomeOng.trim();
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
    }

    function validateEmail() {
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
    }

    const handleSave = async () => {
        if (!validateNome() || !validateEmail()) return;
        const ongId = sessionStorage.getItem("ongId");
        if (!ongId) return;

        const cpfValue = formValues.cpf ? formValues.cpf.replace(/\D/g, "") : undefined;
        const cnpjValue = formValues.cnpj ? formValues.cnpj.replace(/\D/g, "") : undefined;

        const payload = {
            nome: formValues.nomeOng,
            email: formValues.email,
            cnpj: cnpjValue,
            cpf: cpfValue,
            link: formValues.link,
            endereco: {
                cep: formValues.cep.replace(/\D/g, ""),
                rua: formValues.rua,
                numero: formValues.numero,
                cidade: formValues.cidade,
                uf: formValues.uf,
                complemento: formValues.complemento,
            }
        };

        const result = await reqs.updateOngInfosConfig(ongId, payload);
        if (result.success) {
            sessionStorage.setItem("userName", formValues.nomeOng);
            setToast({ mensagem: Strings.atualizacaoDadosSucesso, tipo: 'sucesso' });
            setTimeout(() => {
                window.location.reload();
            }, 1500);
        } else {
            console.error("Erro ao atualizar dados da ONG:", result.error);
            setToast({ mensagem: Strings.erroAtualizacao, tipo: 'erro' });
        }
    };

    function maskCEP(value) {
        return value
            .replace(/\D/g, "")
            .replace(/(\d{5})(\d)/, "$1-$2")
            .slice(0, 9);
    }

    const handleCepChange = async (e) => {
        let value = e.target.value.replace(/\D/g, "");
        if (value.length > 8) value = value.slice(0, 8);
        const masked = maskCEP(value);
        setFormValues((prev) => ({ ...prev, cep: masked }));

        if (value.length === 8) {
            try {
                const res = await axios.get(`https://viacep.com.br/ws/${value}/json/`);
                if (res.data.erro) {
                    setToast({ mensagem: Strings.erroCep1, tipo: "erro" });
                    setFormValues((prev) => ({
                        ...prev,
                        rua: "",
                        cidade: "",
                        uf: ""
                    }));
                } else {
                    setFormValues((prev) => ({
                        ...prev,
                        rua: res.data.logradouro || "",
                        cidade: res.data.localidade || "",
                        uf: res.data.uf || ""
                    }));
                }
            } catch (error) {
                setToast({ mensagem: Strings.erroCep2, tipo: "erro" });
            }
        }
    };

    const docValueFromBackend = tipoDocumento === "CPF" ? formValues.cpf : formValues.cnpj;
    const isDocEditable = tipoDocumento === "CPF"
        ? !(initialCpf && initialCpf.length > 0)
        : !(initialCnpj && initialCnpj.length > 0);

    return (
        <div className="configContainer">
            <div className="toastContainer">
                {toast.mensagem && (
                    <Toast
                        mensagem={toast.mensagem}
                        tipo={toast.tipo}
                        onClose={() => setToast({ mensagem: '', tipo: 'sucesso' })}
                    />
                )}
            </div>

            <h1 style={{ paddingLeft: "5%" }}>Conta</h1>
            <div className="imgUser">
                <UserImage size={160} src={urlImage} hasEdit={true} />
            </div>
            <div className="containerForm">
                <div className="configTextInfo1">
                    <span className="title">Informações pessoais</span>
                    <FormInput
                        id="nome"
                        name="nomeOng"
                        label={Strings.nomeOng}
                        value={formValues.nomeOng}
                        onChange={e => setFormValues({ ...formValues, nomeOng: e.target.value })}
                    />
                    <FormInput
                        id="email"
                        name="email"
                        label={Strings.email}
                        value={formValues.email}
                        onChange={e => setFormValues({ ...formValues, email: e.target.value })}
                    />
                    <div className="configTextInfo2">
                        <div className="inputDif">
                            <div className="bigInput">
                                <FormInput
                                    id={tipoDocumento}
                                    name={tipoDocumento}
                                    label={tipoDocumento}
                                    value={tipoDocumento === "CPF" ? formValues.cpf : formValues.cnpj}
                                    onChange={handleCpfCnpjChange}
                                    disabled={!isDocEditable}
                                />
                            </div>
                            <div className="litInput">
                                <DropDown
                                    id="tipoDocumento"
                                    name="tipoDocumento"
                                    label={Strings.tipo}
                                    options={["CPF", "CNPJ"]}
                                    value={tipoDocumento}
                                    onChange={e => {
                                        setTipoDocumento(e.target.value);
                                        setCpfCnpj("");
                                    }}
                                    disabled={!isDocEditable}
                                />
                            </div>
                        </div>
                    </div>
                    <FormInput
                        id="link"
                        name="link"
                        label={Strings.linkContato}
                        value={formValues.link}
                        onChange={e => setFormValues({ ...formValues, link: e.target.value })}
                        disabled={false}
                    />
                </div>

                <div className="configTextInfo2">
                    <span className="title">Endereço</span>
                    <FormInput
                        id="cep"
                        name="cep"
                        label={Strings.cep}
                        value={formValues.cep}
                        onChange={handleCepChange}
                        disabled={false}
                    />
                    <FormInput
                        id="rua"
                        name="rua"
                        label={Strings.rua}
                        value={formValues.rua}
                        onChange={e => setFormValues({ ...formValues, rua: e.target.value })}
                        disabled={false}
                    />
                    <div className="inputDif">
                        <div className="bigInput">
                            <FormInput
                                id="complemento"
                                name="complemento"
                                label={Strings.complemento}
                                value={formValues.complemento}
                                onChange={e => setFormValues({ ...formValues, complemento: e.target.value })}
                                disabled={false}
                            />
                            <FormInput
                                id="cidade"
                                name="cidade"
                                label={Strings.cidade}
                                value={formValues.cidade}
                                onChange={e => setFormValues({ ...formValues, cidade: e.target.value })}
                                disabled={false}
                            />
                        </div>
                        <div className="litInput">
                            <FormInput
                                id="numero"
                                name="numero"
                                label={Strings.numero}
                                value={formValues.numero}
                                onChange={e => setFormValues({ ...formValues, numero: e.target.value })}
                                disabled={false}

                            />
                            <DropDown
                                id="uf"
                                name="uf"
                                label={Strings.uf}
                                options={ufs}
                                value={formValues.uf}
                                onChange={e => setFormValues({ ...formValues, uf: e.target.value })}
                                disabled={false}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="buttonsAct" >
                <div
                    onClick={async () => {
                        await handleSave();
 
                        const ongId = sessionStorage.getItem("ongId");
                        if (!ongId) return;
                        
                        const result = await reqs.pegarCpfOuCnpjDaOng(ongId);
                        if (result.success) {
                            const data = result.data;
                            setFormValues(prev => ({
                                ...prev,
                                cpf: data.cpf ? formatarCPF(data.cpf.replace(/\D/g, "")) : "",
                                cnpj: data.cnpj ? formatarCNPJ(data.cnpj.replace(/\D/g, "")) : ""
                            }));
                        }
                    }}
                >
                    <PrimaryButton text="Salvar" />
                </div>
            </div>
        </div>
    )
}