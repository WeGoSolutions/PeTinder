import React from 'react';
import styles from './forms.module.css';
import SecondaryButton from '../../components/SecondaryButton';
import PrimaryButton from '../../components/NavBar';


function Forms() {
    return (
        <div className={styles.background}>
            <div className={styles.container}>
                <img src="" alt="./public/assets/closeButton.png" />
                <h1>Formulário de adoção</h1>
                <div className={styles.inputSection}>
                    <span>Informações Pessoais</span>
                    <FormInput
                        id="nome"
                        name="nome"
                        label="Nome"
                        required
                        value={formValues.nome}
                        disabled={true}
                    />
                    <FormInput
                        id="cpf"
                        name="cpf"
                        label="CPF"
                        required
                        value={formValues.cpf}
                        disabled={true}
                    />
                    <FormInput
                        id="email"
                        name="email"
                        label="Email"
                        required
                        value={formValues.email}
                        disabled={true}
                    />
                    <FormInput
                        id="dtNasc"
                        name="dtNasc"
                        label="Data de Nascimento"
                        required
                        value={formValues.dtNasc}
                        disabled={true}
                    />
                    <FormInput
                        id="telefone"
                        name="telefone"
                        label="Telefone"
                        required
                        value={formValues.telefone}
                        disabled={true}
                    />
                </div>
                <div className={styles.inputSection}>
                    <span>Endereço</span>
                    <FormInput
                        id="cep"
                        name="cep"
                        label="CEP"
                        required
                        value={formValues.cep}
                        disabled={true}

                    />
                    <FormInput
                        id="complemento"
                        name="complemento"
                        label="Complemento"
                        required
                        value={formValues.complemento}
                        disabled={true}

                    />
                    <FormInput
                        id="rua"
                        name="rua"
                        label="Rua"
                        required
                        value={formValues.rua}
                        disabled={true}

                    />
                    <FormInput
                        id="numero"
                        name="numero"
                        label="Número"
                        required
                        value={formValues.numero}
                        disabled={true}

                    />
                    <FormInput
                        id="cidade"
                        name="cidade"
                        label="Cidade"
                        required
                        value={formValues.cidade}
                        disabled={true}

                    />
                    <FormInput
                        id="uf"
                        name="uf"
                        label="UF"
                        required
                        value={formValues.uf}
                        disabled={true}

                    />
                </div>
                <div className={styles.adicionalSection}>
                    <div className={styles.checkboxContainer}>
                        <span>Informações Adicionais</span>
                        <span>1. Qual o tipo de moradia que você se encontra nesse momento?</span>
                        <div className={styles.checkbox}>
                            <input type="radio"/>
                            <label>Apartamento próprio</label>
                        </div>

                        <div className={styles.checkbox}>
                            <input type="radio"/>
                            <label>Apartamento alugado</label>
                        </div>

                        <div className={styles.checkbox}>
                            <input type="radio"/>
                            <label>Casa própria</label>
                        </div>

                        <div className={styles.checkbox}>
                            <input type="radio"/>
                            <label>Casa alugada</label>
                        </div>
                    </div>

                    <div className={styles.checkboxContainer}>
                        <span>2. Você tem certeza que é permitido animais no imóvel?</span>
                        <div className={styles.checkbox}>
                            <input type="radio"/>
                            <label>Sim, já verifiquei e tenho certeza.</label>
                        </div>

                        <div className={styles.checkbox}>
                            <input type="radio"/>
                            <label>Não.</label>
                        </div>
                    </div>

                    <div className={styles.answerContainer}>
                        <span>3. O quintal é cercado? Não permitindo que o animal saia para a rua, mas podendo ficar solto no pátio? Ele terá acesso ao interior da residência? Conte-nos mais.</span>
                        <textarea className={styles.answer} placeholder="RESPOSTA"></textarea>
                    </div>

                    <div className={styles.answerContainer}>
                        <span>4. Tem ou já teve outros animais? </span>
                        <div className={styles.checkbox}>
                            <input type="radio"/>
                            <label>Sim.</label>
                        </div>

                        <div className={styles.checkbox}>
                            <input type="radio"/>
                            <label>Não.</label>
                        </div>
                    </div>
                    <div>
                        <span>6. São castrados e vacinados?</span>
                        <div className={styles.checkbox}>
                            <input type="checkbox"/>
                            <label>Castrado.</label>
                        </div>

                        <div className={styles.checkbox}>
                            <input type="checkbox"/>
                            <label>Vacinado.</label>
                        </div>

                        <div className={styles.checkbox}>
                            <input type="checkbox"/>
                            <label>Não.</label>
                        </div>
                    </div>
                    <div className={styles.answerContainer}>
                        <span>3. Se você tem outros animais atualmente, haverá espaço para prevenir uma briga territorial? Como será a adaptação?</span>
                        <textarea className={styles.answer} placeholder="RESPOSTA"></textarea>
                    </div>
                    <div className={styles.answerContainer}>
                        <span>4. Inclua 5 ou mais fotos que mostrem onde o novo Pet viverá.</span>
                        <textarea className={styles.answer} placeholder="RESPOSTA"></textarea>
                    </div>
                    <div className={styles.confirmInfos}>
                        <input type="checkbox" />
                        <span>Eu confirmo que todas as informações descritas são verdadeiras.</span>
                    </div>

                    <div className={styles.buttonContainer}>
                        <span>Salvar alterações</span>
                        <SecondaryButton text="Cancelar"/>
                        <PrimaryButton text="Enviar" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Forms;