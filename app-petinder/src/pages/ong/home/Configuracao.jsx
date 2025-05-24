import React from "react";
import FormInput from "../../../components/FormInput";
import PrimaryButton from "../../../components/PrimaryButton";
import "../../../components/components.css";
import SecondaryButton from "../../../components/SecondaryButton";
import DropDown from "../../../components/DropDown";

export default function Configuracao() {
    const ufs = ["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"];

    return (
        <div className="configContainer">
            {/* <h2>Atualize suas informações de conta</h2> */}
            <h2>Atualize seus dados cadastrais</h2>
            <div className="imgUser">
                <img src="/cauan.svg" alt="Foto de perfil do usuário" />
            </div>
            <div className="containerForm">
                <div className="configTextInfo1">
                    <span className="title">Informações pessoais</span>
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
                    <div className="registerFormRow">
                        <FormInput
                            id="dataNasc"
                            name="dataNasc"
                            label="Data de Nascimento"
                            type="date"
                            required
                        />
                    </div>
                </div>

                <div className="configTextInfo2">
                    <span className="title">Endereço</span>
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
                    <div className="inputDif">
                        <div className="bigInput">
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
                        <div className="litInput">
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
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="buttonsAct">
                <PrimaryButton text="Salvar" />
                <div className="secondaryButton">
                    <SecondaryButton text="Cancelar" />
                </div>
            </div>
        </div>
    )
}