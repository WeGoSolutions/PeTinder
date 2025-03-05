import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { GlobalStyle } from "./style";

import {
    BackgroundContainer,
    FormContainer,
    Title,
    InputAlign,
    FloatingLabel,
    Input,
    AlignWrapper,
    DatePickerButton,
    TermsText,
    CheckboxWrapper,
    HiddenCheckbox,
    StyledCheckbox,
    TermsLink,
    AlignButtonWrapper,
    SubmitButton,
    ImageContainer
} from "./style";

const SignupForm = () => {
    const [date, setDate] = useState(null);
    const [isChecked, setIsChecked] = useState(false);
    const [formValues, setFormValues] = useState({
        nome: "",
        email: "",
        senha: "",
        confirmarSenha: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    return (
        <>
            <GlobalStyle /> {/* Aplica o reset de estilos */}
            <BackgroundContainer>
                <FormContainer>
                    <Title>PeTinder</Title>

                    <InputAlign>
                        <Input
                            type="text"
                            name="nome"
                            value={formValues.nome}
                            onChange={handleChange}
                            placeholder=" "
                            required
                        />
                        <FloatingLabel hasContent={formValues.nome !== ""}>
                            Nome Completo
                        </FloatingLabel>
                    </InputAlign>

                    <InputAlign>
                        <Input
                            type="email"
                            name="email"
                            value={formValues.email}
                            onChange={handleChange}
                            placeholder=" "
                            required
                        />
                        <FloatingLabel hasContent={formValues.email !== ""}>
                            Email
                        </FloatingLabel>
                    </InputAlign>

                    <InputAlign>
                        <Input
                            type="password"
                            name="senha"
                            value={formValues.senha}
                            onChange={handleChange}
                            placeholder=" "
                            required
                        />
                        <FloatingLabel hasContent={formValues.senha !== ""}>
                            Senha
                        </FloatingLabel>
                    </InputAlign>

                    <InputAlign>
                        <Input
                            type="password"
                            name="confirmarSenha"
                            value={formValues.confirmarSenha}
                            onChange={handleChange}
                            placeholder=" "
                            required
                        />
                        <FloatingLabel hasContent={formValues.confirmarSenha !== ""}>
                            Confirmar Senha
                        </FloatingLabel>
                    </InputAlign>


                    <AlignWrapper>
                        <DatePicker
                            selected={date}
                            onChange={(selectedDate) => setDate(selectedDate)}
                            dateFormat="dd/MM/yyyy"
                            customInput={
                                <DatePickerButton>
                                    {date ? date.toLocaleDateString("pt-BR") : "Data de Nascimento"}
                                </DatePickerButton>}
                            popperPlacement="bottom"
                        />

                        <TermsText>
                            <CheckboxWrapper>
                                <HiddenCheckbox checked={isChecked} onChange={handleCheckboxChange} />
                                <StyledCheckbox checked={isChecked} />
                            </CheckboxWrapper>
                            Aceito os <TermsLink href="#">Termos de condição</TermsLink>.
                        </TermsText>
                    </AlignWrapper>
                    
                    <AlignButtonWrapper>
                        <SubmitButton>Criar Conta</SubmitButton>
                    </AlignButtonWrapper>
                </FormContainer>

                {/* Imagem ao lado do FormContainer */}
                <ImageContainer />
            </BackgroundContainer>
        </>
    );
};

export default SignupForm;
