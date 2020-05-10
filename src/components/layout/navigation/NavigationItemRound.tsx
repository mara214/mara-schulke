import React from 'react';
import styled from 'styled-components';

import { rem } from 'lib/polished';

import NavigationItem, { NavigationItemProps } from 'components/layout/navigation/NavigationItem';

const NavigationItemRound = styled(NavigationItem)<NavigationItemProps>`
	width: ${rem(40)};
	height: ${rem(40)};
	display: flex;
	justify-content: center;
	align-items: center;
	color: ${props => props.theme.colors.navigationForeground};
	padding: ${props => rem(props.theme.spacings.xsmall)};
	cursor: pointer;
	border-radius: 1000rem;
`;

export default NavigationItemRound;
