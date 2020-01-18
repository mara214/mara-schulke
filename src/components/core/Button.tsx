import React from 'react';
import styled, { css } from 'styled-components';
import { rem } from 'lib/polished';

interface ButtonProps {
	muted?: boolean;
	slim?: boolean;
}

export default styled.button<ButtonProps>`
	display: block;
	width: min-content;
	max-width: ${rem(300)};

	color: ${props => props.theme.colors.background};
	background: ${props => props.theme.colors.highlight};
	padding: ${props => rem(props.theme.spacings.small)} ${props => rem(props.theme.spacings.medium)};
	border-radius: ${props => rem(props.theme.border.radius.rounded)};
	margin-bottom: ${props => rem(props.theme.spacings.medium)};
	transition: all ${props => props.theme.animation.duration.fast}s;
	line-height: 1.5;
	white-space: nowrap;
	user-select: none;
	cursor: pointer;

	&:hover {
		color: ${props => props.theme.colors.highlightForeground};
		background: ${props => props.theme.colors.highlightDark};
	}

	${props =>
		props.muted &&
		css`
			color: ${props => props.theme.colors.highlight};
			background: ${props => props.theme.colors.highlightLight};
		`}

	${props =>
		props.slim &&
		css`
			margin-bottom: 0;
		`}
`;
