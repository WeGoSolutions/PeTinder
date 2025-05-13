import React from "react";
import NavBar from "../../components/NavBar";
import FormInput from "../../components/FormInput";
import PrimaryButton from "../../components/PrimaryButton";
import styles from './config.module.css';
import SecondaryButton from "../../components/SecondaryButton";
import NavBar from "../../components/NavBar";

function Config() {
    return (
        <div >
            <NavBar />
            <div className={styles.configContainer}>
                <div className={styles.sideMenu}>
                    <span> v Configurações</span>
                    <span> v Conta</span>
                </div>
                <div className={styles.division}></div>
                <div className={styles.configInfos}>
                    <img src="" alt="" />
                    <div className={styles.configTextInfo}>
                        <span>Informações pessoais</span>
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
                        <FormInput
                            id="dataNasc"
                            name="dataNasc"
                            label="Data de Nascimento"
                        />    
                    </div>

                    <div className={styles.configTextInfo}>
                        <span>Endereço</span>
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
                        <FormInput
                            id="complemento"
                            name="complemento"
                            label="Complemento"
                        />    
                        <FormInput
                            id="numero"
                            name="numero"
                            label="Número"
                        />   
                        <FormInput
                            id="cidade"
                            name="cidade"
                            label="Cidade"
                        />  
                        <FormInput
                            id="uf"
                            name="uf"
                            label="UF"
                        />   
                    </div>
                    <div className={styles.buttons}>
                        <PrimaryButton text="Salvar"/>
                        <SecondaryButton text="Cancelar"/>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Config;