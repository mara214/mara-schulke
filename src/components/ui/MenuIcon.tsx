import React, { FunctionComponent } from 'react';
import styled, { css } from 'styled-components';
import {rem} from "lib/polished";

interface MenuIconProps {
    open: boolean;
    inverted: boolean;
    onClick(): void;
    className?: string;
}

const MenuIconContainer = styled.button<{ open: boolean, inverted: boolean; }>`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    width: 1.5rem;
    height: 1rem;
    outline: none;
    padding: 0;
    background-color: transparent;

    span {
        transition: all ${props => props.theme.animation.duration.instant}s;
        opacity: 1;
        display: block;
        width: 100%;
        height: ${rem(2)};
        background-color: ${props => props.theme.colors.foreground};
        
        ${props => props.inverted && css`
            background-color: ${props.theme.colors.highlightForeground};
        `}
    }
    
    ${props => props.open && css`
        span:first-child {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        span:nth-child(2) {
            opacity: 0;
        }
        
        span:last-child {
            transform: rotate(-45deg) translate(5px, -5px);
        }
    `}
`;

const MenuIcon: FunctionComponent<MenuIconProps> = ({ className, inverted, open, onClick }) => (
    <MenuIconContainer open={open} onClick={onClick} className={className} inverted={inverted}>
        <span></span>
        <span></span>
        <span></span>
    </MenuIconContainer>
);

export default MenuIcon;
