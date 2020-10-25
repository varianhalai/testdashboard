import React from "react";
import styled, { css, ThemeProvider } from "styled-components";
import closedIcon from "../assets/closed@3x.png";
import ethIcon from "../assets/png_eth@3x.png";

const Container = styled.div`
  ${({ isOpen }) => {
    if (isOpen) {
      return css`
        display: flex;
        position: fixed;
        width: 100%;
        height: 100vh;
        transform: translate(-50%, -50%);
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
  background-color: white;
  border-radius: 12px;
  width: 560px;
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  padding: 40px 0;

  p {
    font-size: 16px;
    line-height: 24px;
    color: rgba(31, 35, 41, 0.65);
    margin-bottom: 0;
  }
`;

const CloseIcon = styled.img`
  position: absolute;
  right: 20px;
  top: 20px;
  height: 15px;
  width: 15px;
  cursor: pointer;
`;

const EthIcon = styled.img`
  width: 66px;
  height: 80px;
`;

const ErrorModal = ({ state, onSubmit, onClose, isOpen }) => (
  <Container isOpen={isOpen}>
    <Inner>
      <CloseIcon src={closedIcon} onClick={onClose} />
      <EthIcon src={ethIcon} />
      <h3>No ETH Account Available</h3>
      <p>You are not yet logged in.</p>
      <button onClick={onSubmit}>Connect Wallet</button>
    </Inner>
  </Container>
);

export default ErrorModal;
