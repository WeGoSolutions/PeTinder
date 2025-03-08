import styled, { createGlobalStyle } from "styled-components";
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
justify-content: center;
align-items: center;
flex-direction: column;
  font-family: 'Poppins', sans-serif;
  background: #F4F4F4;
  padding: 30px;
  border-radius: 15px;
  width: 560px;
  height: 560px
  text-align: center;
  box-shadow: 6px 6px rgb(0, 0, 0);
`;

export const Title = styled.h2`
  font-size: 30px;
  margin-top: 70px;
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

export const AlignCloseButton = styled.div`
    width: 100%;
`;

export const CloseButton = styled.button`
background: none;
    border: none;
    background-image: url(/assets/closeButton.png);
    background-size: cover;
    background-position: center;
    height: 25px;
    width: 25px;
    background-repeat: no-repeat;
    cursor: pointer;
`;

export const InputContainer = styled.div`
    margin-top: 70px;
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
}
`;

export const AlignButtonWrapper = styled.div`
  margin-top: 5px;
`;

export const SubmitButton = styled.button`
font-family: 'Poppins', sans-serif;
  width: 232px;
  height: 50px;
  padding: 12px;
  background: #ffb6c1;
  border: none;
  border-radius: 25px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 15px;
  transition: background 0.3s;
  
  &:hover {
    background: #ff8aa1;
  }
`;

export const Button = styled.button`
font-family: 'Poppins', sans-serif;
  width: 232px;
  height: 50px;
  padding: 12px;
  background: #F4F4F4;
  border: 4px solid #FFC0D9;
  border-radius: 25px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s;
  
  &:hover {
    background: #FFC0D9;
  }
`;

export const LinkText = styled.span`
  color: #80465D;
  cursor: pointer;
    text-decoration: underline;
`;

export const AlignLinkTextWrapper = styled.div`
    margin-top: 5px;
    width: 80%;
    font-weight: 600;
`;

export const ImageContainer = styled.div`
  display: none; /* Não utilizado no login */
`;