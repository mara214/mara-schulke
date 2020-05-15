import React, { FunctionComponent } from 'react';
import styled, { css } from "styled-components";
import { Link } from "gatsby";

import { rem } from "lib/polished";
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
	font-weight: 300;
	color: ${props => props.theme.colors.navigationForeground};
`;