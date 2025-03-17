import React, { useState } from "react";
import {
    GlobalStyle,
    BackgroundContainer,
    FormContainer,
    Title,
    InputAlign,
    InputContainer,
    FloatingLabel,
    Input,
    InputAlignDate,
    InputDate,
    Text
} from "./style";
import { capitalizar, validarMaiorDeIdade, formatarCPF, formatarCNPJ, formatarTelefone, formatarCEP } from "../../utils";

const DemonstrationForm = () => {
    const [formValues, setFormValues] = useState({
        capitalizado: "",
        cep: "",
        cpf: "",
        cnpj: "",
        telefone: "",
        dataNascimento: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        let formattedValue = value;

        if (name === "capitalizado") {
            formattedValue = capitalizar(value)
        } else if (name === "cep") {
            formattedValue = formatarCEP(value);
        } else if (name === "cpf") {
            formattedValue = formatarCPF(value);
        } else if (name === "cnpj") {
            formattedValue = formatarCNPJ(value);
        } else if (name === "telefone") {
            formattedValue = formatarTelefone(value);
        } else if (name === "dataNascimento") {
            formattedValue = value;
        }

        setFormValues({ ...formValues, [name]: formattedValue });
    };

    const ageValidation = formValues.dataNascimento ? validarMaiorDeIdade(formValues.dataNascimento) : { idade: "", ehMaiorDeIdade: "" };

    return (
        <>
            <GlobalStyle />
            <BackgroundContainer>
                <FormContainer>
                    <Title>PeTinder</Title>
                    <InputContainer>
                        <InputAlign>
                            <Input
                                type="text"
                                name="capitalizado"
                                value={formValues.capitalizado}
                                placeholder=""
                                onChange={handleChange}
                                required
                            />
                            <FloatingLabel hasContent={formValues.capitalizado !== ""}>
                                Capitalizado
                            </FloatingLabel>
                        </InputAlign>

                        <InputAlign>
                            <Input
                                type="text"
                                name="cep"
                                value={formValues.cep}
                                placeholder=""
                                onChange={handleChange}
                                maxLength={9}
                                required
                            />
                            <FloatingLabel hasContent={formValues.cep !== ""}>
                                Formatação de CEP
                            </FloatingLabel>
                        </InputAlign>

                        <InputAlign>
                            <Input
                                type="text"
                                name="cpf"
                                value={formValues.cpf}
                                placeholder=""
                                onChange={handleChange}
                                maxLength={14}
                                required
                            />
                            <FloatingLabel hasContent={formValues.cpf !== ""}>
                                Formatação de CPF
                            </FloatingLabel>
                        </InputAlign>

                        <InputAlign>
                            <Input
                                type="text"
                                name="cnpj"
                                value={formValues.cnpj}
                                placeholder=""
                                onChange={handleChange}
                                maxLength={18}
                                required
                            />
                            <FloatingLabel hasContent={formValues.cnpj !== ""}>
                                Formatação de CNPJ
                            </FloatingLabel>
                        </InputAlign>

                        <InputAlign>
                            <Input
                                type="text"
                                name="telefone"
                                value={formValues.telefone}
                                placeholder=""
                                onChange={handleChange}
                                maxLength={15}
                                required
                            />
                            <FloatingLabel hasContent={formValues.telefone !== ""}>
                                Formatação de Telefone
                            </FloatingLabel>
                        </InputAlign>

                        <Text>Data de Nascimento</Text>
                        <InputAlignDate>
                            <InputDate
                                type="date"
                                name="dataNascimento"
                                value={formValues.dataNascimento}
                                placeholder=""
                                onChange={handleChange}
                                required
                            />
                            <p>Idade: {ageValidation.idade !== "" ? ageValidation.idade : "..."}</p>
                            <p>+21: {ageValidation.ehMaiorDeIdade !== "" ? (ageValidation.ehMaiorDeIdade ? "Sim" : "Não") : "..."}</p>
                        </InputAlignDate>

                    </InputContainer>
                </FormContainer>

            </BackgroundContainer>
        </>
    );
};

export default DemonstrationForm;