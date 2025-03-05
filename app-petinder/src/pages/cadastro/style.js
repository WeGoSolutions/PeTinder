import styled, { createGlobalStyle } from "styled-components";
import "react-datepicker/dist/react-datepicker.css";
import background from "/assets/fundo.png";

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

export const BackgroundContainer = styled.div`
  background-image: url(${background});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: flex-start; /* Alinha ao início da tela */
  align-items: center;
  padding-left: 100px; /* Adiciona uma margem grande à esquerda */
`;

// Novo componente para a imagem do lado direito
export const ImageContainer = styled.div`
  width: 553px; /* Ajusta o tamanho da imagem para ocupar metade da tela */
  height: 80%; /* Faz a altura ocupar a tela toda */
  background-image: url("/assets/cao-cadastro.png");
  background-size: cover;
  background-position: center;
`;

export const FormContainer = styled.div`
  font-family: 'Poppins', sans-serif;
  background: #f7f7f7;
  padding: 60px;
  border-radius: 15px;
  width: 553px;
  text-align: center;
  box-shadow: 6px 6px rgb(0, 0, 0);
`;

export const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 15px;
  font-weight: bold;
`;

export const InputAlign = styled.div`
  position: relative;
  width: 100%;
  margin: 8px 0;
`;

export const FloatingLabel = styled.label`
  position: absolute;
  top: ${(props) => (props.hasContent ? "5px" : "50%")};
  left: 12px;
  font-size: ${(props) => (props.hasContent ? "12px" : "16px")};
  color: #000;
  pointer-events: none;
  transform: translateY(-50%);
  transition: all 0.3s ease;
`;

export const Input = styled.input`
  font-family: 'Poppins', sans-serif;
  color: #000;
  width: 100%;
  padding: 16px 12px 8px;
  margin: 8px 0;
  border: 2px solid black;
  border-radius: 10px;
  font-size: 16px;
  outline: none;
  &:focus + ${FloatingLabel}, /* Quando o input está focado */
  &:not(:placeholder-shown) + ${FloatingLabel} { /* Quando há conteúdo */
    top: 19px;
    font-size: 12px;
    color: #000;
  }
}
`;

export const AlignWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: flex-start; 
`;

export const DatePickerButton = styled.button`
font-family: 'Poppins', sans-serif;
  width: 100%;
  padding: 12px;
  margin: 8px 0;
  border: 2px solid black;
  border-radius: 10px;
  background: white;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  justify-content: flex-start;
  align-items: center; 

  /* Ícone do calendário */
  &::before {
    content: ""; /* Adiciona um elemento visual */
    background-image: url("/assets/icone-calendario.png"); 
    background-size: contain;
    background-repeat: no-repeat;
    width: 20px;
    height: 20px;
    margin-right: 10px; 
  }
`;

// Estilização do checkbox com borda customizada
export const CheckboxWrapper = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 16px;
`;

export const HiddenCheckbox = styled.input.attrs({ type: "checkbox" })`
  display: none; /* Esconde o checkbox original */
`;

export const StyledCheckbox = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid black; /* Borda do checkbox */
  border-radius: 4px; /* Bordas arredondadas */
  margin-right: 10px; /* Espaço entre o checkbox e o texto */
  background-color: ${(props) => (props.checked ? "#ffb6c1" : "white")}; /* Cor de fundo quando selecionado */
  display: flex;
  justify-content: center;
  align-items: center;

  /* Criando o marcador de seleção (check) */
  &::after {
    content: ${(props) => (props.checked ? '"✔"' : '""')}; /* Adiciona o ícone de check */
    position: absolute;
    font-size: 14px;
    color: black;
  }
`;

export const TermsText = styled.p`
  font-size: 14px;
  margin-top: 10px;
  display: flex;
`;

export const TermsLink = styled.a`
  color: #8a3b55;
  font-weight: bold;
`;

export const AlignButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: flex-end; 
  padding-top: 20px;
`;

export const SubmitButton = styled.button`
font-family: 'Poppins', sans-serif;
  width:40%;
  padding: 12px;
  background: #ffb6c1;
  border: none;
  border-radius: 25px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 15px;
  
  &:hover {
    background: #ff8aa1;
  }
`;
