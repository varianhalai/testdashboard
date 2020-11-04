import React from 'react';
import styled, { ThemeProvider } from "styled-components";
import {darkTheme,lightTheme} from '../../styles/appStyles';



const SkeletonPanel = styled.div `
display: flex;
flex-direction: column;
align-items: center;
width: 100%;
height: 15rem;
background: none;
border: ${(props) => props.theme.style.mainBorder};
border-radius: .5rem;
overflow: hidden;
box-shadow: ${(props) => props.theme.style.panelBoxShadow};

    .skeleton-header {
        margin: 0;
        height: 6rem;
        width: 100%;
        border-bottom: 2px solid black;

    }

    &::before {
        content: '';
        position: relative;
        left: -150px;
        top: 0;
        height: 100%;
        width: 100%;
        background: linear-gradient(to right, transparent 10%, #A2E7DB 50%, transparent 100%);
        animation: load 1.8s cubic-bezier(0.4, 0.0, 0.2, 1) infinite;
    }

    @keyframes load {
        from {
            left: -100%;
        }
        to   {
            left: 100%;
        }
    }

    &.stake-skeleton


`;

const AddTokenSkeleton = ({state}) => {
    return (
        <ThemeProvider theme={state.theme === "dark" ? darkTheme : lightTheme}>
            <SkeletonPanel>
                
                
            </SkeletonPanel>
        </ThemeProvider>
        
    );
}

export default AddTokenSkeleton;