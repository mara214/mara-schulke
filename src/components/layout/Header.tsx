import React, { FunctionComponent, useEffect, useState, useContext } from 'react';
import styled, { css } from 'styled-components';

import Container from 'components/layout/Container';
import Navigation from "components/layout/navigation/Navigation";
import MenuIcon from 'components/layout/menu/MenuIcon';
import MenuOverlay from 'components/layout/menu/MenuOverlay';

import { linearGradient } from 'lib/polished';
import { landscape } from 'lib/media';
import HeaderHomeLink from "components/layout/header/HeaderHomeLink";

export interface Invertible {
	inverted: boolean;
}

export interface Openable {
	open: boolean;
}

const HeaderContainer = styled.div<Invertible>`
	color: ${props => props.theme.colors.highlightForeground};

	${props => props.inverted && css`
		color: ${props => props.theme.colors.foreground};
		background-image: ${linearGradient(props.theme.colors.highlightGradient)};
	`}
`;

const NavigationContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const NavigationDesktopWrapper = styled.div`
	${landscape} {	
		display: none;
	}
`;

const NavigationMobileWrapper = styled.div`
	display: none;

	${landscape} {
		display: flex;
	}
`;

interface HeaderProps {
	toggleTheme(): void;
	location: any;
}

const Header: FunctionComponent<HeaderProps> = ({ toggleTheme, location }) => {
	const [open, setOpen] = useState(false);
	const toggleOpen = () => setOpen(o => !o);
	const inverted = location.pathname === '/';

	useEffect(() => {
		if (open) {
			document.body.style.height = '100vh';
			document.body.style.overflowY = 'hidden';
		} else {
			document.body.style.height = '';
			document.body.style.overflowY = '';
		}
	}, [open]);

	const nav = (
		<Navigation
			open={open}
			inverted={inverted}
			toggleOpen={toggleOpen}
			toggleTheme={toggleTheme}
		/>
	);

	return (
		<HeaderContainer inverted={inverted}>
			<Container>
				<NavigationContainer>
					<HeaderHomeLink inverted={inverted} />
					<NavigationDesktopWrapper>{nav}</NavigationDesktopWrapper>
					<NavigationMobileWrapper>
						<MenuIcon
							inverted={inverted}
                            open={open}
							onClick={toggleOpen}
						/>
						{open ? <MenuOverlay>{nav}</MenuOverlay> : null}
					</NavigationMobileWrapper>
				</NavigationContainer>
			</Container>
		</HeaderContainer>
	);
};

export default Header;
