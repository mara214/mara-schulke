import React, { FunctionComponent } from 'react';
import styled from "styled-components";

import { landscape } from "lib/media";

import NavigationItem from "components/layout/navigation/NavigationItem";
import NavigationItemRound from "components/layout/navigation/NavigationItemRound";
import NavigationItemIcon from "components/layout/navigation/NavigationItemIcon";
import NavigationThemeToggleIcon from "components/layout/navigation/NavigationThemeToggleIcon";

import { Invertible, Openable } from "components/layout/Header";

interface SearchProps extends Invertible, Openable {}

const Search: FunctionComponent<SearchProps> = ({ inverted, open }) => (
   <NavigationItemIcon inverted={inverted || open} strokeWidth={0} fill="currentColor">
        <path d='M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z' />
   </NavigationItemIcon>
);

const NavigationContainer = styled.ul`
    display: flex;
    align-items: center;
    list-style: none;
    margin: 0;

    ${landscape} {
        flex-direction: column;
    }
`;

interface NavigationProps extends Invertible, Openable {
    toggleTheme(): void;
    toggleOpen(): void;
}

const Navigation: FunctionComponent<NavigationProps> = ({ inverted, open, toggleTheme, toggleOpen }) => (
    <nav>
        <NavigationContainer>
            <NavigationItem to="/latest" inverted={inverted || open}>Latest Posts</NavigationItem>
            <NavigationItemRound
                inverted={inverted || open}
                onClick={() => {
                    console.log("open search")
                }}
            >
                <Search />
            </NavigationItemRound>
            <NavigationItemRound
                inverted={inverted || open}
                onClick={() => {
                    toggleTheme();
                    toggleOpen();
                }}>
                <NavigationThemeToggleIcon inverted={inverted} open={open} />
            </NavigationItemRound>
        </NavigationContainer>
    </nav>
);

export default Navigation;