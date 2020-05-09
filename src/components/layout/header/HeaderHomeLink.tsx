import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

import { Invertible } from 'components/layout/Header';

const Title = styled.span<Invertible>`
	color: ${props => props.theme.colors.navigationForeground};
	white-space: nowrap;
`;

const HeaderHomeLink: FunctionComponent<Invertible> = ({ inverted }) => {
	return (
		<Link to='/'>
			<Title inverted={inverted}>&#955;</Title>
		</Link>
	);
};

export default HeaderHomeLink;
