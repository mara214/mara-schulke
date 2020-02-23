import React from 'react';
import styled, { css } from 'styled-components';

import { rem, darken, transparentize } from 'lib/polished';

import NavigationItem, { NavigationItemProps } from 'components/layout/navigation/NavigationItem';

const NavigationItemRound = styled(NavigationItem)<NavigationItemProps>`
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
		background-color: ${props => props.theme.colors.highlight};

		svg {
			stroke: ${props => props.theme.colors.highlightForeground};
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

export default NavigationItemRound;
