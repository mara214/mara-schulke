import React, { FunctionComponent } from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';

import { Layout } from 'layouts/default';
import { RichText } from 'components/core/RichText';
import SEO from 'components/layout/SEO';

interface HomePageProps {
	data: any;
}

const HomePageContainer = styled.div`
	h1 {
		margin-top: 0;
	}
`;

const HomePage: FunctionComponent<HomePageProps> = ({ data }) => {
	const document = data.prismic.allHomePages.edges[0].node;

	return (
		<Layout>
			<HomePageContainer>
				<SEO lang='en' title='test' />

				<RichText render={document.title} />
				<RichText render={document.introduction} />
			</HomePageContainer>
		</Layout>
	);
};

export const query = graphql`
	{
		prismic {
			allHomePages(uid: null) {
				edges {
					node {
						title
						introduction
					}
				}
			}
		}
	}
`;

export default HomePage;
