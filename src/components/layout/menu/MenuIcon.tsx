import React, { FunctionComponent } from 'react';
import styled, { css } from 'styled-components';

import { rem } from 'lib/polished';

import { Openable } from 'components/layout/Header';

interface MenuIconProps extends Openable {
	onClick(): void;
	className?: string;
}

const MenuIconContainer = styled.button<MenuIconProps>`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	background-color: transparent;
	cursor: pointer;
	outline: none;
	position: relative;
	width: ${props => rem(props.theme.spacings.small * 2 + 24)};
	height: ${props => rem(props.theme.spacings.small * 2 + 16)};
	padding: ${props => rem(props.theme.spacings.small)};

	span {
		opacity: 1;
		display: block;
		width: 1.5rem;
		height: ${rem(2)};
		background-color: ${props => props.theme.colors.navigationForeground};
		transition: all ${props => props.theme.animation.duration.instant}s;
	}

	${props =>
		props.open &&
		css`
			z-index: ${props => props.theme.layers.overlay.content};

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

const MenuIcon: FunctionComponent<MenuIconProps> = ({ className, open, onClick }) => (
	<MenuIconContainer open={open} onClick={onClick} className={className} title="Open Menu">
		<span />
		<span />
		<span />
	</MenuIconContainer>
);

export default MenuIcon;
