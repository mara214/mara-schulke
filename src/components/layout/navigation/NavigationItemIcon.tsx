import React from 'react';
import styled from "styled-components";

const NavigationItemIcon = styled.svg.attrs(props => ({
    stroke: props.theme.colors.navigationForeground,
    viewBox: '0 0 24 24',
    strokeLinecap: 'round',
    strokeLinejoin: 'round'
}))`
    width: 1rem;
    height: 1rem;
    fill: none;
    transition: all ${props => props.theme.animation.duration.fast}s;

    :hover {
        fill: none;
    }
`;

export default NavigationItemIcon;