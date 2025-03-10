import styled, { createGlobalStyle } from "styled-components";
import "react-datepicker/dist/react-datepicker.css";
import background from "/assets/Login/fundoLogin.png";

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
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
`;

export const FormContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  font-family: 'Poppins', sans-serif;
  background: #F4F4F4;
  padding: 30px;
  border-radius: 15px;
  width: 70vw;
  height: 80vh;
  text-align: center;
  box-shadow: 6px 6px rgb(0, 0, 0);
`;

export const Title = styled.h2`
  font-size: 30px;
  font-weight: bold;
`;

export const InputAlign = styled.div`
  position: relative;
  width: 100%;
`;

export const FloatingLabel = styled.label`
  position: absolute;
  top: ${(props) => (props.hasContent ? "5px" : "50%")};
  left: 12px;
  transform: translateY(-50%);
  transition: top 0.2s, font-size 0.2s;
  font-size: ${(props) => (props.hasContent ? "12px" : "16px")};
  color: #202020;
  font-weight: 600;
`;

export const InputContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: left;
  width: 80%;
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
  font-weight: 600;

  &:focus + ${FloatingLabel}, /* Quando o input está focado */
  &:not(:placeholder-shown) + ${FloatingLabel} { /* Quando há conteúdo */
    top: 19px;
    font-size: 12px;
    color: #000;
    font-weight: 600;  
  }
`;

export const InputDate = styled.input`
  font-family: 'Poppins', sans-serif;
  color: #000;
  width: 40%;
  padding: 12px 8px;
  margin: 8px 0;
  border: 2px solid black;
  border-radius: 10px;
  font-size: 16px;
  outline: none;
  font-weight: 600;
`;

export const InputAlignDate = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  position: relative;
  width: 100%;
`;