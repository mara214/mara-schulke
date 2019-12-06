import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

import Container from 'components/layout/Container';
import { Link } from 'gatsby';

interface HeaderProps {}

const Header: FunctionComponent<HeaderProps> = props => (
	<Container>
		<Link to='/'>home</Link>
		<span> </span>
		<Link to='/blog'>blog</Link>
	</Container>
);

export default Header;
