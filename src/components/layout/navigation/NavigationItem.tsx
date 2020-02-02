import React, { FunctionComponent } from 'react';
import styled, { css } from "styled-components";
import { Link } from "gatsby";

import { fonts } from "lib/typography";
import { rem } from "lib/polished";
import { darken, transparentize } from "polished";
import { landscape } from "lib/media";

console.log("FIX STYLEDLISTITEM")
const StyledListItem = styled.li`
	display: block;
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

export interface NavigationItemProps {
	inverted: boolean;
	to?: string;
	className?: string;
	onClick?: () => void;
}

const NavigationItem: FunctionComponent<NavigationItemProps> = ({ to, className, children, onClick }) => {
	let content;

	if(to) {
		content = (
			<Link to={to} className={className} onClick={onClick}>{children}</Link>
		);
	} else {
		content = (
			<button className={className} onClick={onClick}>
				{children}
			</button>
		);
	}

	return (
		<StyledListItem>
			{content}
		</StyledListItem>
	);
};

export default styled(NavigationItem)<NavigationItemProps>`
	display: block;
	background-color: transparent;
	white-space: nowrap;
	cursor: pointer;
	font-family: ${fonts.light};
	color: ${props => props.theme.colors.foreground};
	border-radius: ${props => rem(props.theme.border.radius.rounded)};
	padding: ${props => rem(props.theme.spacings.small)};
	transition: all ${props => props.theme.animation.duration.fast}s;

	:hover {
		color: ${props => props.theme.colors.highlight};
		background-color: ${props => transparentize(0.8, props.theme.colors.highlightDark)};
	}

	${props => props.inverted && css`
		color: ${props.theme.colors.highlightForeground};

		:hover {
			color: ${props.theme.colors.highlightForeground};
			background-color: ${props => transparentize(0.8, darken(0.2, props.theme.colors.highlightDark))};
		}
	`}
`;