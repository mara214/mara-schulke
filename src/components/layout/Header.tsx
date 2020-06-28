import React, { FunctionComponent, useState } from 'react';
import styled from 'styled-components';

import Container from 'components/layout/Container';
import Navigation from 'components/layout/navigation/Navigation';
import MenuIcon from 'components/layout/menu/MenuIcon';
import MenuOverlay from 'components/layout/menu/MenuOverlay';
import HeaderHomeLink from 'components/layout/header/HeaderHomeLink';

import { rem } from 'lib/polished';
import { landscape } from 'lib/media';

import { useScrollData } from 'hooks/use-scroll-data';

export interface Openable {
	open: boolean;
}

const HeaderContainer = styled.header`
	position: fixed;
	width: 100%;
	top: 0;
	z-index: ${props => props.theme.layers.overlay.foreground};
	color: ${props => props.theme.colors.navigationForeground};
	background-color: ${props => props.theme.colors.navigationBackground};
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
}

const Header: FunctionComponent<HeaderProps> = ({ toggleTheme, openSearch }) => {
	const { y, deltaY } = useScrollData(100);
	const [open, setOpen] = useState(false);
	const toggleOpen = () => setOpen(o => !o);

	const hidden = y > 200 && deltaY > 0;

	const nav = (
		<Navigation
			open={open}
			setOpen={value => setOpen(value)}
			toggleTheme={toggleTheme}
			openSearch={openSearch}
		/>
	);

	return (
		<HeaderContainer
			css={`
				${hidden ? `transform: translateY(-100%);` : ''}
				transition: transform ${(props: any) => props.theme.animation.duration.smooth}s ease-out;
			`}
		>
			<Container
				css={`
					padding-top: ${(props: any) => rem(props.theme.spacings.medium)};
					padding-bottom: ${(props: any) => rem(props.theme.spacings.medium)};
				`}
			>
				<NavigationContainer>
					<HeaderHomeLink />
					<NavigationDesktopWrapper>{nav}</NavigationDesktopWrapper>
					<NavigationMobileWrapper>
						<MenuIcon
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
