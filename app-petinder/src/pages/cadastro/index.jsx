import React, { useState, forwardRef } from "react";
import DatePicker from "react-datepicker";
import { GlobalStyle } from "./style";
import { useNavigate } from "react-router-dom";
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
    TermsTextLogin,
    CheckboxWrapper,
    HiddenCheckbox,
    StyledCheckbox,
    TermsLink,
    AlignButtonWrapper,
    SubmitButton,
    ImageContainer,
    ModalContainer,
    ModalContent,
    CloseButton
} from "./style";

const SignupForm = () => {
    const [date, setDate] = useState(null);
    const [isChecked, setIsChecked] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formValues, setFormValues] = useState({
        nome: "",
        email: "",
        senha: "",
        confirmarSenha: ""
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Verifica se os campos estão preenchidos
        const { nome, email, senha, confirmarSenha } = formValues;
        if (!nome || !email || !senha || !confirmarSenha || !date || !isChecked) {
            alert("Por favor, preencha todos os campos e aceite os termos.");
            return;
        }

        // Verifica se as senhas coincidem
        if (senha !== confirmarSenha) {
            alert("As senhas não coincidem!");
            return;
        }

        // Se tudo estiver certo, exibe o modal
        setIsModalOpen(true);
    };

    // Função para enviar os dados quando o usuário confirma no modal
    const handleConfirmSubmit = async () => {
        setIsModalOpen(false); // Fecha o modal

        const userData = {
            nome: formValues.nome,
            email: formValues.email,
            senha: formValues.senha,
            dataNasc: date ? date.toISOString().split("T")[0] : null,
            cpf: null,
            cep: null,
            rua: null,
            numero: null,
            cidade: null,
            uf: null
        };

        try {
            const response = await fetch("http://localhost:8080/usuarios", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData)
            });

            if (!response.ok) {
                throw new Error("Erro ao criar conta. Tente novamente.");
            }

            alert("Conta criada com sucesso!");

            // Opcional: Resetar o formulário após o sucesso
            setFormValues({
                nome: "",
                email: "",
                senha: "",
                confirmarSenha: ""
            });
            setDate(null);
            setIsChecked(false);

            // Redireciona para a página de login
            navigate("/login");
        } catch (error) {
            console.error("Erro:", error);
            alert(error.message);
        }
    };

    const CustomDateInput = forwardRef(({ value, onClick }, ref) => (
        <DatePickerButton onClick={onClick} ref={ref}>
            {value || "Data de Nascimento"}
        </DatePickerButton>
    ));

    return (
        <>
            <GlobalStyle />
            <BackgroundContainer>
                <FormContainer onSubmit={handleSubmit}>
                    <AlignWrapper>
                        <CloseButton><img src="/assets/Cadastro/sair.png" alt="" /></CloseButton>
                    </AlignWrapper>
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
                            customInput={<CustomDateInput />}
                            popperPlacement="bottom"

                            // Para permitir escolher mês e ano diretamente
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"

                            // Limitar anos (ex: de 1900 até o ano atual)
                            minDate={new Date(1900, 0, 1)}
                            maxDate={new Date()}
                        />

                        <TermsText>
                            <CheckboxWrapper>
                                <HiddenCheckbox checked={isChecked} onChange={handleCheckboxChange} />
                                <StyledCheckbox checked={isChecked} />
                            </CheckboxWrapper>
                            Li e aceito os <TermsLink href="#">Termos de condição</TermsLink>.
                        </TermsText>
                    </AlignWrapper>

                    <AlignButtonWrapper>
                        <SubmitButton onClick={handleSubmit}>Criar Conta</SubmitButton>
                    </AlignButtonWrapper>

                    <TermsTextLogin>
                        Já possui conta? Clique aqui para entrar no <TermsLink href="#" to="/login">PeTinder</TermsLink>!
                    </TermsTextLogin>
                </FormContainer>

                <ImageContainer />
            </BackgroundContainer>

            {/* Modal */}
            {isModalOpen && (
                <ModalContainer>
                    <ModalContent>
                        <AlignWrapper>
                        <CloseButton onClick={() => setIsModalOpen(false)}>✖</CloseButton>

                        </AlignWrapper>
                        <h2>IMPORTANTE</h2>
                        <p>O abandono, a negligência, a falta de alimentação, a soltura irresponsável e o tratamento inadequado de animais são formas de maus-tratos, sujeitas a penalidades conforme o artigo 32 da Lei Federal 9.605/1998 (Lei de Crimes Ambientais) e a Lei Municipal 13.131/2001 (Lei de Posse Responsável). Em caso de dúvidas, busque sempre orientação de profissionais qualificados, evitando informações de fontes não especializadas.</p>
                        <SubmitButton onClick={handleConfirmSubmit}>Estou Ciente</SubmitButton>
                    </ModalContent>
                </ModalContainer>
            )}
        </>
    );
};

export default SignupForm;