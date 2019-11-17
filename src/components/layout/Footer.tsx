import React, { FunctionComponent } from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import styled from 'styled-components';

import Container from 'components/layout/Container';

interface FooterProps {}

const Footer: FunctionComponent<FooterProps> = props => {
	// const res = useStaticQuery(graphql`
	// 	{
	// 		prismic {

	// 		}
	// 	}
	// `);

	return <Container slim>Test</Container>;
};

export default Footer;
