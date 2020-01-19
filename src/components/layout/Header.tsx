import React, { FunctionComponent } from 'react';
import styled, { css } from 'styled-components';
import {linearGradient, rem, darken, transparentize} from 'lib/polished'
import { Link } from 'gatsby';

import Container from 'components/layout/Container';
import { fonts } from 'lib/typography';

interface HeaderProps {
	toggleTheme(): void;
	location: any;
}

const HeaderNavigationLink = styled(Link)<{ inverted: boolean }>`
	transition: all ${props => props.theme.animation.duration.fast}s;
	font-family: ${fonts.light};
	color: ${props => props.theme.colors.foreground};
	border-radius: ${props => rem(props.theme.border.radius.rounded)};
	padding: ${props => rem(props.theme.spacings.small)};
	
	:hover {
		color: ${props => props.theme.colors.highlight};
		background-color: ${props => transparentize(0.9, props.theme.colors.highlightDark)};
	}
	
	${props => props.inverted && css`
		color: ${props.theme.colors.highlightForeground};
		
		:hover {
			color: ${props.theme.colors.highlightForeground};
			background-color: ${props => transparentize(0.8, darken(0.2, props.theme.colors.highlightDark))};
		}
	`}
`;

const HeaderContainer = styled.div<{ inverted: boolean }>`
	color: ${props => props.theme.colors.highlightForeground};
	
	${props => props.inverted && css`
		color: ${props => props.theme.colors.foreground};
		background-image: ${linearGradient(props.theme.colors.highlightGradient)};
	`}
`;

const Title = styled.span<{ inverted: boolean }>`
	color: ${props => props.theme.colors.foreground};
	white-space: nowrap;
	
	${ props => props.inverted && css`
		color: ${props => props.theme.colors.highlightForeground};
	`}
`;

const AvatarContainer = styled.span<{ inverted: boolean }>`
	display: block;
	border-radius: 10rem;
	overflow: hidden;
	width: 4rem;
	height: 4rem;
	background-color: ${props => props.theme.colors.muted};
	
	img {
		margin: 0;
		width: 4rem;
		height: 4rem;
	}
	
	${props => props.inverted && css`
		background-color: ${props.theme.colors.highlightDark};
	`}
`;

const Avatar: FunctionComponent<{inverted: boolean}> = ({ inverted }) => (
	<AvatarContainer inverted={inverted}>
		<img src="/assets/maximilian-schulke.png" alt="portrait" />
	</AvatarContainer>
);

const HeaderHomeLink : FunctionComponent<{ inverted: boolean }> = ({ inverted }) => {
	return (
		<Link to='/' style={{ display: "flex", width: 'min-content' }}>
			<span style={{ marginRight: '1rem'}}>
				<Avatar inverted={inverted}/>
			</span>
			<Title inverted={inverted}>Maximilian Schulke</Title>
		</Link>
	);
};


const Header: FunctionComponent<HeaderProps> = props => {
	const inverted = props.location.pathname === "/";

	return (
		<HeaderContainer inverted={inverted}>
			<Container>
				<div style={{ display: "flex", alignItems: "center"}}>
					<HeaderHomeLink inverted={inverted}/>

					<HeaderNavigationLink inverted={inverted} to="/blog">Blog</HeaderNavigationLink>
				</div>
				{/*
				<Button as='span' muted slim onClick={props.toggleTheme}>
					Toggle DarkMode
				</Button>
			*/}
			</Container>
		</HeaderContainer>
	);
};

export default Header;
