import React, { useEffect, useState } from "react";
import FormInput from "../../../components/FormInput";
import PrimaryButton from "../../../components/PrimaryButton";
import "../../../components/components.css";
import SecondaryButton from "../../../components/SecondaryButton";
import DropDown from "../../../components/DropDown";
import UserImage from "../../../components/UserImage";
import { formatarCPF, formatarCNPJ, formatarCEP } from "../../../utils";
import axios from "axios";
import { url } from "../../../provider/apiInstance";

export default function Configuracao() {
    const ufs = ["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"];

    const [tipoDocumento, setTipoDocumento] = useState("CNPJ");

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
        // imagemUrl: ""
    });

    useEffect(() => {
        const ongId = sessionStorage.getItem("ongId");
        if (!ongId) return;
        url.get(`/ongs/${ongId}`)
            .then(res => {
                const data = res.data;
                const endereco = data.endereco || {};
                // Formata o CPF ou CNPJ ao setar os valores iniciais
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
            alert("Dados atualizados com sucesso!");
        } catch (error) {
            console.error("Erro ao atualizar dados da ONG:", error);
            alert("Erro ao atualizar dados da ONG.");
        }
    };

    return (
        <div className="configContainer">
            {/* <h2>Atualize suas informações de conta</h2> */}
            <h1 style={{ paddingLeft: "5%" }}>Conta</h1>
            <div className="imgUser">
                <UserImage size={160} src="/aumigosLogo.svg" hasEdit={true} />
                {/* <img src="/cauan.svg" alt="Foto de perfil do usuário" /> */}
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
                                    // value={cpfCnpj}
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

                    />
                    <FormInput
                        id="rua"
                        name="rua"
                        label="Rua"
                        value={formValues.rua}
                        onChange={e => setFormValues({ ...formValues, rua: e.target.value })}

                    />
                    <div className="inputDif">
                        <div className="bigInput">
                            <FormInput
                                id="complemento"
                                name="complemento"
                                label="Complemento"
                                value={formValues.complemento}
                                onChange={e => setFormValues({ ...formValues, complemento: e.target.value })}

                            />
                            <FormInput
                                id="cidade"
                                name="cidade"
                                label="Cidade"
                                value={formValues.cidade}
                                onChange={e => setFormValues({ ...formValues, cidade: e.target.value })}

                            />
                        </div>
                        <div className="litInput">
                            <FormInput
                                id="numero"
                                name="numero"
                                label="Número"
                                value={formValues.numero}
                                onChange={e => setFormValues({ ...formValues, numero: e.target.value })}

                            />
                            <DropDown
                                id="uf"
                                name="uf"
                                label="UF"
                                options={ufs}
                                value={formValues.uf}
                                onChange={e => setFormValues({ ...formValues, uf: e.target.value })}

                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="buttonsAct" onClick={handleSave}>
                <PrimaryButton text="Salvar" />
            </div>
        </div>
    )
}

// { POST DA ONG
//   "cnpj": "12345678000190",
//   "cpf": "12345678909",
//   "nome": "Joao da Silva",
//   "razaoSocial": "Teste",
//   "senha": "SenhaForte123!",
//   "email": "joao.siielvaa@example.com",
//   "link": "https://www.jscomercio.com.br",
//   "endereco": {
//     "cep": "02530005",
//     "rua": "dos bobos",
// 		"numero": "12",
// 		"cidade": "Jalpao do sul",
// 		"uf": "SP",
// 		"complemento": "casa"
//   }
// }