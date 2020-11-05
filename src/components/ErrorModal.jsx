import React from "react";
import styled, { css, ThemeProvider } from "styled-components";
import { darkTheme, lightTheme, fonts } from "../styles/appStyles";

const Container = styled.div`
  ${({ isOpen }) => {
    if (isOpen) {
      return css`
        display: flex;
        position: fixed;
        width: 100%;
        height: 100vh;
        background-color: #07070767;
        top: 50%;
        transform: translateY(-50%);
        z-index: 100;
        align-items: center;
        justify-content: center;
      `;
    } else {
      return css`
        display: none;
      `;
    }
  }}
`;

const Inner = styled.div`
  background-color: ${(props) => props.theme.style.wikiTabBackground};
  border-radius: 1.2rem;
  width: 56rem;
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  padding: 4rem 0;
  font-family: ${fonts.contentFont};
  border: ${(props) => props.theme.style.mainBorder};
  box-shadow: ${(props) => props.theme.style.panelBoxShadow};
  .error-title {
    font-family: ${fonts.headerFont};
    font-size: 1.8rem;
    margin: 1rem 0;
  }

  p {
    font-size: 16px;
    line-height: 24px;
    color: ${(props) => props.theme.style.primaryFontColor};
    margin-bottom: 0;
  }
`;

const CloseIcon = styled.span`
  position: absolute;
  right: 2rem;
  top: 2rem;
  font-size: 1.2rem;
  font-family: ${fonts.headerFont}
  cursor: pointer;
  color: ${(props) => props.theme.style.primaryFontColor};
`;

const ErrorModal = ({ state, onClose }) => (
  <ThemeProvider theme={state.theme === "dark" ? darkTheme : lightTheme}>
    <Container isOpen={state.error.display}>
      <Inner>
        <h4 className="error-title">Whoa, partner!</h4>
        <p>{state.error.message}</p>
        <CloseIcon onClick={onClose}>X</CloseIcon>
        
      </Inner>
    </Container>
  </ThemeProvider>
);

export default ErrorModal;
