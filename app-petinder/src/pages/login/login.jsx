import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    GlobalStyle,
    BackgroundContainer,
    FormContainer,
    AlignCloseButton,
    CloseButton,
    Title,
    InputAlign,
    InputContainer,
    FloatingLabel,
    Input,
    AlignButtonWrapper,
    AlignLinkTextWrapper,
    LinkText,
    SubmitButton,
    Button,
    ImageContainer
} from "./style";

const LoginForm = () => {
    const [formValues, setFormValues] = useState({
        email: "",
        senha: ""
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const { email, senha } = formValues;
    
        try {
            const response = await fetch(`http://localhost:8080/usuarios?email=${email}&senha=${senha}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
    
            if (!response.ok) {
                throw new Error("Erro ao fazer login. Verifique suas credenciais.");
            }
    
            const data = await response.json();
    
            if (data.length > 0) {
                console.log("Login bem-sucedido:", data[0]);
    
                localStorage.setItem("userId", data[0].id);
    
                // navigate("/");
            } else {
                throw new Error("Email ou senha incorretos.");
            }
        } catch (error) {
            console.error("Erro:", error);
            alert(error.message);
        }
    };
    

    return (
        <>
            <GlobalStyle />
            <BackgroundContainer>
                <FormContainer>
                    <AlignCloseButton>
                        <CloseButton>
                            x
                        </CloseButton>
                    </AlignCloseButton>
                    <Title>PeTinder</Title>
                    <InputContainer>
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
                    </InputContainer>

                    <AlignLinkTextWrapper>
                        <p>
                            Criar conta no <LinkText onClick={() => navigate("/")}>PeTinder</LinkText>
                        </p>
                    </AlignLinkTextWrapper>

                    <AlignButtonWrapper>
                        <SubmitButton type="submit" onClick={handleSubmit}>Entrar</SubmitButton>
                    </AlignButtonWrapper>
                    <AlignButtonWrapper>
                        <Button type="button" onClick={() => alert("Recuperação de senha ainda não implementada")}>
                            Esqueci minha senha
                        </Button>
                    </AlignButtonWrapper>
                </FormContainer>

                <ImageContainer />
            </BackgroundContainer>
        </>
    );
};

export default LoginForm;