import React, { useState } from "react";
import DatePicker from "react-datepicker";

import {
    FormContainer,
    Title,
    Input,
    DatePickerButton,
    TermsText,
    TermsLink,
    SubmitButton
} from "./style"; // Importando os estilos corretamente

const SignupForm = () => {
    const [date, setDate] = useState(null);

    return (
        <FormContainer>
            <Title>PeTinder</Title>

            <Input type="text" placeholder="Nome Completo" />
            <Input type="email" placeholder="Email" />
            <Input type="password" placeholder="Senha" />
            <Input type="password" placeholder="Confirmar Senha" />

            {/* Flatpickr para data de nascimento */}
            {/* <DatePickerWrapper> */}
                <DatePicker
                    selected={date}
                    onChange={(selectedDate) => setDate(selectedDate)}
                    dateFormat="dd/MM/yyyy"
                    customInput={<DatePickerButton />}
                    placeholderText="Data de Nascimento"
                    popperPlacement="bottom"  // Faz com que o calendário apareça abaixo do campo de input
                />
            {/* </DatePickerWrapper> */}

            <TermsText>
                Aceito os <TermsLink href="#">Termos de condição</TermsLink>.
            </TermsText>

            <SubmitButton>Criar Conta</SubmitButton>
        </FormContainer>
    );
};

export default SignupForm;
