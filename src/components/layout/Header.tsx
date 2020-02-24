import React, { FunctionComponent, useEffect, useState, useContext } from 'react';
import styled, { css } from 'styled-components';

import Container from 'components/layout/Container';
import Navigation from 'components/layout/navigation/Navigation';
import MenuIcon from 'components/layout/menu/MenuIcon';
import MenuOverlay from 'components/layout/menu/MenuOverlay';
import HeaderHomeLink from 'components/layout/header/HeaderHomeLink';

import { linearGradient, rem } from 'lib/polished';
import { landscape } from 'lib/media';

export interface Invertible {
	inverted: boolean;
}

export interface Openable {
	open: boolean;
}

const HeaderContainer = styled.div<Invertible>`
	position: relative;
	color: ${props => props.theme.colors.highlightForeground};

	${props =>
		props.inverted &&
		css`
			color: ${props => props.theme.colors.foreground};
			background: ${linearGradient(props.theme.colors.highlightGradient)};
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
	openSearch(): void;
	toggleTheme(): void;
	location: any;
}

const Header: FunctionComponent<HeaderProps> = ({ toggleTheme, openSearch, location }) => {
	const [open, setOpen] = useState(false);
	const toggleOpen = () => setOpen(o => !o);

	// For now - this is deactivated.
	// Was originally = location.pathname === '/';
	const inverted = false;

	const nav = (
		<Navigation
			open={open}
			inverted={inverted}
			setOpen={value => setOpen(value)}
			toggleTheme={toggleTheme}
			openSearch={openSearch}
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
							inverted={inverted || open}
							open={open}
							onClick={toggleOpen}
							css={`
								right: -${(props: any) => rem(props.theme.spacings.small)};
							`}
						/>
						{open ? <MenuOverlay>{nav}</MenuOverlay> : null}
					</NavigationMobileWrapper>
				</NavigationContainer>
			</Container>
		</HeaderContainer>
	);
};

export default Header;
