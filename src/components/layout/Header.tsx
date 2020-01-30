import React, { FunctionComponent, useEffect, useState, useContext } from 'react';
import styled, { css, ThemeContext } from 'styled-components';
import { lighten, linearGradient, rem, darken, transparentize } from 'lib/polished';
import { Link } from 'gatsby';

import Container from 'components/layout/Container';
import MenuIcon from 'components/ui/MenuIcon';

import { fonts } from 'lib/typography';
import { landscape, mobile } from 'lib/media';
import MenuOverlay from 'components/ui/MenuOverlay';
import { ThemeType } from 'lib/themes';

interface HeaderProps {
	toggleTheme(): void;
	location: any;
}

const StyledSvg = styled.svg.attrs(props => ({
	viewBox: '0 0 24 24',
	strokeWidth: '0'
}))<{ inverted: boolean }>`
	height: 1rem;
	width: 1rem;
	fill: ${props => props.theme.colors.foreground};

	:hover {
		fill: ${props => props.theme.colors.highlightForeground};
	}

	${props =>
		props.inverted &&
		css`
			fill: ${props => props.theme.colors.highlightForeground};
		`}
`;

const HeaderNavigationButton = styled.button<{ inverted: boolean }>`
	width: ${rem(40)};
	height: ${rem(40)};
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: ${props => props.theme.colors.muted};
	color: ${props => props.theme.colors.foreground};
	padding: ${props => rem(props.theme.spacings.xsmall)};
	cursor: pointer;
	border-radius: 1000rem;

	:hover {
		color: ${props => props.theme.colors.highlightForeground};
		background-color: ${props => props.theme.colors.highlightDark};

		svg {
			fill: ${props => props.theme.colors.highlightForeground};
		}
	}

	${props =>
		props.inverted &&
		css`
			color: ${props.theme.colors.highlightForeground};
			background-color: ${props => transparentize(0.8, props.theme.colors.highlightDark)};

			:hover {
				background-color: ${props => transparentize(0.8, darken(0.2, props.theme.colors.highlightDark))};
			}
		`};
`;

const HeaderNavigationItem = styled.button<{ inverted: boolean }>`
	background-color: transparent;
	white-space: nowrap;
	cursor: pointer;
	transition: all ${props => props.theme.animation.duration.fast}s;
	font-family: ${fonts.light};
	color: ${props => props.theme.colors.foreground};
	border-radius: ${props => rem(props.theme.border.radius.rounded)};
	padding: ${props => rem(props.theme.spacings.small)};

	:hover {
		color: ${props => props.theme.colors.highlight};
		background-color: ${props => transparentize(0.8, props.theme.colors.highlightDark)};
	}

	${props =>
		props.inverted &&
		css`
			color: ${props.theme.colors.highlightForeground};

			:hover {
				color: ${props.theme.colors.highlightForeground};
				background-color: ${props => transparentize(0.8, darken(0.2, props.theme.colors.highlightDark))};
			}
		`}
`;

const HeaderContainer = styled.div<{ inverted: boolean }>`
	color: ${props => props.theme.colors.highlightForeground};

	${props =>
		props.inverted &&
		css`
			color: ${props => props.theme.colors.foreground};
			background-image: ${linearGradient(props.theme.colors.highlightGradient)};
		`}
`;

const Title = styled.span<{ inverted: boolean }>`
	color: ${props => props.theme.colors.foreground};
	white-space: nowrap;

	${props =>
		props.inverted &&
		css`
			color: ${props => props.theme.colors.highlightForeground};
		`}
`;

const AvatarContainer = styled.span<{ inverted: boolean }>`
	display: block;
	border-radius: 10rem;
	overflow: hidden;
	width: ${rem(50)};
	height: ${rem(50)};
	background-color: ${props => props.theme.colors.muted};

	img {
		margin: 0;
		width: ${rem(50)};
		height: ${rem(50)};
	}

	${props =>
		props.inverted &&
		css`
			background-color: ${props.theme.colors.highlightDark};
		`}
`;

const Avatar: FunctionComponent<{ inverted: boolean }> = ({ inverted }) => (
	<AvatarContainer inverted={inverted}>
		<img src='/assets/maximilian-schulke.png' alt='portrait' />
	</AvatarContainer>
);

const HeaderHomeLink: FunctionComponent<{ inverted: boolean }> = ({ inverted }) => {
	return (
		<Link to='/' style={{ display: 'flex', width: 'min-content', alignItems: 'center' }}>
			<span style={{ marginRight: '1rem' }}>
				<Avatar inverted={inverted} />
			</span>
			<Title
				inverted={inverted}
				css={`
					${mobile} {
						display: none;
					}
				`}>
				Maximilian Schulke
			</Title>
		</Link>
	);
};

const StyledLi = styled.li`
	margin: 0;

	:not(:last-child) {
		margin-right: ${(props: any) => rem(props.theme.spacings.small)};
	}

	${landscape} {
		:not(:last-child) {
			margin-bottom: ${(props: any) => rem(props.theme.spacings.small)};
			margin-right: 0;
		}
	}
`;

const Header: FunctionComponent<HeaderProps> = props => {
	const theme = useContext(ThemeContext);
	const [open, setOpen] = useState(false);
	const inverted = props.location.pathname === '/';

	useEffect(() => {
		if (open) {
			document.body.style.height = '100vh';
			document.body.style.overflowY = 'hidden';
		} else {
			document.body.style.height = '';
			document.body.style.overflowY = '';
		}
	}, [open]);

	const Sun = () => (
		<svg
			stroke='currentColor'
			strokeWidth='2'
			viewBox='0 0 24 24'
			strokeLinecap='round'
			strokeLinejoin='round'
			css={`
				height: 1rem;
				width: 1rem;
				fill: none !important;
			`}>
			<circle cx='12' cy='12' r='5' />
			<line x1='12' y1='1' x2='12' y2='3' />
			<line x1='12' y1='21' x2='12' y2='23' />
			<line x1='4.22' y1='4.22' x2='5.64' y2='5.64' />
			<line x1='18.36' y1='18.36' x2='19.78' y2='19.78' />
			<line x1='1' y1='12' x2='3' y2='12' />
			<line x1='21' y1='12' x2='23' y2='12' />
			<line x1='4.22' y1='19.78' x2='5.64' y2='18.36' />
			<line x1='18.36' y1='5.64' x2='19.78' y2='4.22' />
		</svg>
	);

	const Moon = () => (
		<svg
			stroke='currentColor'
			strokeWidth='2'
			viewBox='0 0 24 24'
			strokeLinecap='round'
			strokeLinejoin='round'
			css={`
				height: 1rem;
				width: 1rem;
				fill: none !important;
			`}>
			<path d='M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z' />
		</svg>
	);

	const renderNavigation = () => (
		<nav>
			<ul
				css={`
					display: flex;
					align-items: center;
					list-style: none;
					margin: 0;

					${landscape} {
						flex-direction: column;
					}
				`}>
				<StyledLi>
					<Link to='/latest' css={``}>
						<HeaderNavigationItem inverted={inverted || open}>Latest Posts</HeaderNavigationItem>
					</Link>
				</StyledLi>
				<StyledLi>
					<HeaderNavigationButton inverted={inverted}>
						<StyledSvg inverted={inverted}>
							<path d='M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z' />
						</StyledSvg>
					</HeaderNavigationButton>
				</StyledLi>
				<StyledLi>
					<HeaderNavigationButton
						inverted={inverted}
						onClick={() => {
							props.toggleTheme();
							setOpen(false);
						}}
						css={`
							${(inverted || open) &&
									css`
										svg {
											stroke: ${(props: any) => props.theme.colors.highlightForeground};
										}
									`}
								:hover {
								svg {
									stroke: ${(props: any) => props.theme.colors.highlightForeground};
								}
							}
						`}>
						{theme._id === ThemeType.Light ? <Moon /> : <Sun />}
					</HeaderNavigationButton>
				</StyledLi>
			</ul>
		</nav>
	);

	return (
		<HeaderContainer inverted={inverted}>
			<Container>
				<div
					css={`
						display: flex;
						align-items: center;
						justify-content: space-between;
					`}>
					<HeaderHomeLink inverted={inverted} />

					<div
						css={`
							${landscape} {
								display: none;
							}
						`}>
						{renderNavigation()}
					</div>
					<div
						css={`
							display: none;

							${landscape} {
								display: flex;
							}
						`}>
						<MenuIcon
							open={open}
							inverted={inverted || open}
							onClick={() => setOpen(o => !o)}
							css={
								open
									? css`
											z-index: 99;
									  `
									: ''
							}
						/>
						{open ? <MenuOverlay children={renderNavigation()} /> : null}
					</div>
				</div>
			</Container>
		</HeaderContainer>
	);
};

export default Header;
