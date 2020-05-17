import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

const Title = styled.span`
	color: ${props => props.theme.colors.navigationForeground};
	white-space: nowrap;
`;

const HeaderHomeLink: FunctionComponent<{}> = ({ }) => {
	return (
		<Link to='/'>
			<Title>&#955;</Title>
		</Link>
	);
};

export default HeaderHomeLink;
