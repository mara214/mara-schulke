import React from 'react';
import styled, { css } from "styled-components";

import { Invertible } from "components/layout/Header";

const NavigationItemIcon = styled.svg.attrs(props => ({
    stroke: 'currentColor',
    viewBox: '0 0 24 24',
    strokeLinecap: 'round',
    strokeLinejoin: 'round'
}))<Invertible>`
    width: 1rem;
    height: 1rem;
    fill: none;
    transition: all ${props => props.theme.animation.duration.fast};
    
    :hover {
        fill: none;
    }
    
    ${props => props.inverted && css`
        stroke: ${props => props.theme.colors.highlightForeground};
    `}
`;

export default NavigationItemIcon;