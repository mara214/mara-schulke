import React, { FunctionComponent } from 'react';
import { graphql } from 'gatsby';
import { Link } from 'gatsby';
import styled from 'styled-components';

import { Layout } from 'layouts/default';
import { RichText } from 'components/core/RichText';

import Button from 'components/ui/Button';
import SEO from 'components/layout/SEO';

interface HomePageProps {
	data: any;
	location: any;
}

const HomePageContainer = styled.div`
	h1 {
		margin-top: 0;
	}
`;

const HomePage: FunctionComponent<HomePageProps> = ({ data, location }) => {
	const document = data.prismic.allHomePages.edges[0].node;

	return (
		<Layout location={location}>
			<HomePageContainer>
				<SEO lang='en' title='Home' />
				<RichText render={document.introduction} />

				<Link to='/latest'>
					<Button muted slim>
						Browse all articles
					</Button>
				</Link>
				<hr />
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
						introduction
					}
				}
			}
		}
	}
`;

export default HomePage;
