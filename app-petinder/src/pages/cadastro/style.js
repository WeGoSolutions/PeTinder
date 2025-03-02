import styled from "styled-components";
import "react-datepicker/dist/react-datepicker.css";

export const FormContainer = styled.div`
  background: #f7f7f7;
  padding: 30px;
  border-radius: 15px;
  width: 350px;
  text-align: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 15px;
  font-weight: bold;
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin: 8px 0;
  border: 2px solid black;
  border-radius: 10px;
  font-size: 16px;
  outline: none;
`;

// export const DatePickerWrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   width: 100%;
//   align-items: center;
// `;

export const DatePickerButton = styled.button`
  width: 100%;
  padding: 12px;
  margin: 8px 0;
  border: 2px solid black;
  border-radius: 10px;
  background: white;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  justify-content: flex-start; /* Coloca o texto e o ícone na linha, à esquerda */
  align-items: center; /* Centraliza o texto e o ícone verticalmente */

  /* Estilo para o ícone */
  &::after {
    content: ""; /* Remove o conteúdo de texto */
    background-image: url("/assets/icone-calendario.png"); /* Caminho para sua imagem */
    background-size: contain; /* Ajusta o tamanho da imagem */
    background-repeat: no-repeat;
    width: 20px; /* Ajuste o tamanho do ícone */
    height: 20px; /* Ajuste o tamanho do ícone */
    margin-left: 10px; /* Adiciona um espaço entre o texto e a imagem */
  }
`;

export const TermsText = styled.p`
  font-size: 14px;
  margin-top: 10px;
`;

export const TermsLink = styled.a`
  color: #8a3b55;
  font-weight: bold;
  text-decoration: none;
`;

export const SubmitButton = styled.button`
  width: 100%;
  padding: 12px;
  background: #ffb6c1;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 15px;

  &:hover {
    background: #ff8aa1;
  }
`;
