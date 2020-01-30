import React, { FunctionComponent } from 'react';
import styled, { css } from 'styled-components';
import {linearGradient, rem} from "lib/polished";

interface MenuOverlayProps {
    className?: string;
}

const MenuOverlayContainer = styled.div`
    display: flex;
    align-items: center;
    background-color: ${props => linearGradient(props.theme.colors.highlightGradient)};
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    color: ${props => props.theme.colors.highlightForeground};
`;

const MenuOverlay: FunctionComponent<MenuOverlayProps> = ({ className, children }) => (
    <MenuOverlayContainer className={className}>
        <div css={`
            height: min-content;
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center; 
        `}>
            { children }
        </div>
    </MenuOverlayContainer>
);

export default MenuOverlay;
