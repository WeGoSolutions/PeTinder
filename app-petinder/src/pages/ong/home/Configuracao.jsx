import React, { useEffect, useState } from "react";
import FormInput from "../../../components/FormInput";
import PrimaryButton from "../../../components/PrimaryButton";
import "../../../components/components.css";
import DropDown from "../../../components/DropDown";
import UserImage from "../../../components/UserImage";
import { formatarCPF, formatarCNPJ, formatarCEP } from "../../../utils";
import axios from "axios";
import { url } from "../../../provider/apiInstance";
import Toast from "../../../components/Toast";


export default function Configuracao() {
    const ufs = ["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"];
    const [tipoDocumento, setTipoDocumento] = useState("CNPJ");
    const [toast, setToast] = useState({ mensagem: '', tipo: 'sucesso' });
    const [cpfCnpj, setCpfCnpj] = useState("");

    const handleCpfCnpjChange = (e) => {
        let value = e.target.value.replace(/\D/g, "");

        if (tipoDocumento === "CPF") {
            if (value.length > 11) value = value.slice(0, 11);
            setCpfCnpj(formatarCPF(value));
        } else {
            if (value.length > 14) value = value.slice(0, 14);
            setCpfCnpj(formatarCNPJ(value));
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
        imagemUrl: ""
    });

    useEffect(() => {
        const ongId = sessionStorage.getItem("ongId");
        if (!ongId) return;
        url.get(`/ongs/${ongId}/imagem/arquivo`)
            .then(res => {
                const data = res.data;

                setFormValues({
                    imagemUrl: data.imagemUrl
                });
            })
    }, [])

    useEffect(() => {
        const ongId = sessionStorage.getItem("ongId");
        if (!ongId) return;
        url.get(`/ongs/${ongId}`)
            .then(res => {
                const data = res.data;
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
                    // imagemUrl: data.imagemUrl || "",
                });
            })
            .catch(err => {
                console.error("Erro ao buscar dados do usuário:", err);
            });
    }, []);

    const handleSave = async () => {
        const ongId = sessionStorage.getItem("ongId");
        if (!ongId) return;


        const payload = {
            nome: formValues.nomeOng,
            email: formValues.email,
            cnpj: tipoDocumento === "CNPJ" ? cpfCnpj.replace(/\D/g, "") : formValues.cnpj.replace(/\D/g, ""),
            cpf: tipoDocumento === "CPF" ? cpfCnpj.replace(/\D/g, "") : formValues.cpf.replace(/\D/g, ""),
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

        try {
            await url.patch(`/ongs/${ongId}`, payload);
            sessionStorage.setItem("userName", formValues.nomeOng);
            setToast({ mensagem: 'Dados atualizados com sucesso!', tipo: 'sucesso' });
            setTimeout(() => {
                window.location.reload();
            }, 1500);
        } catch (error) {
            console.error("Erro ao atualizar dados da ONG:", error);
            setToast({ mensagem: 'Erro ao atualizar dados.', tipo: 'erro' });
        }
    };

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
                <UserImage size={160} src={formValues.imagemUrl} hasEdit={true} />
            </div>
            <div className="containerForm">
                <div className="configTextInfo1">
                    <span className="title">Informações pessoais</span>
                    <FormInput
                        id="nome"
                        name="nomeOng"
                        label="Nome da ONG"
                        value={formValues.nomeOng}
                        onChange={e => setFormValues({ ...formValues, nomeOng: e.target.value })}
                    />
                    <FormInput
                        id="email"
                        name="email"
                        label="Email"
                        value={formValues.email}
                        onChange={e => setFormValues({ ...formValues, email: e.target.value })}
                    />
                    <div className="configTextInfo2">
                        <div className="inputDif">
                            <div className="bigInput">
                                <FormInput
                                    id="cpfcnpj"
                                    name="cpfcpnj"
                                    label={tipoDocumento}
                                    value={tipoDocumento === "CPF" ? formValues.cpf : formValues.cnpj}
                                    onChange={handleCpfCnpjChange}
                                />
                            </div>
                            <div className="litInput">
                                <DropDown
                                    id="tipoDocumento"
                                    name="tipoDocumento"
                                    label="Tipo"
                                    options={["CPF", "CNPJ"]}
                                    value={tipoDocumento}
                                    onChange={e => {
                                        setTipoDocumento(e.target.value);
                                        setCpfCnpj("");
                                    }}
                                    disabled={false}
                                />
                            </div>
                        </div>
                    </div>
                    <FormInput
                        id="link"
                        name="link"
                        label="Link de Contato"
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
                        label="CEP"
                        value={formValues.cep}
                        onChange={e => setFormValues({ ...formValues, cep: e.target.value })}
                        disabled={false}
                    />
                    <FormInput
                        id="rua"
                        name="rua"
                        label="Rua"
                        value={formValues.rua}
                        onChange={e => setFormValues({ ...formValues, rua: e.target.value })}
                        disabled={false}
                    />
                    <div className="inputDif">
                        <div className="bigInput">
                            <FormInput
                                id="complemento"
                                name="complemento"
                                label="Complemento"
                                value={formValues.complemento}
                                onChange={e => setFormValues({ ...formValues, complemento: e.target.value })}
                                disabled={false}
                            />
                            <FormInput
                                id="cidade"
                                name="cidade"
                                label="Cidade"
                                value={formValues.cidade}
                                onChange={e => setFormValues({ ...formValues, cidade: e.target.value })}
                                disabled={false}
                            />
                        </div>
                        <div className="litInput">
                            <FormInput
                                id="numero"
                                name="numero"
                                label="Número"
                                value={formValues.numero}
                                onChange={e => setFormValues({ ...formValues, numero: e.target.value })}
                                disabled={false}

                            />
                            <DropDown
                                id="uf"
                                name="uf"
                                label="UF"
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
                <div onClick={handleSave}>
                    <PrimaryButton text="Salvar" />
                </div>
            </div>
        </div>
    )
}