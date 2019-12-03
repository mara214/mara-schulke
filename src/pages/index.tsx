import React, { FunctionComponent } from 'react';
import { graphql } from 'gatsby';
import { Link } from 'gatsby';
import styled from 'styled-components';

import { Layout } from 'layouts/default';
import { RichText } from 'components/core/RichText';

import Button from 'components/core/Button';
import Banner from 'components/core/Banner';
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
				<SEO lang='en' title='Home' />
				<Banner banner={document.banner} />
				<RichText render={document.introduction} />

				<Link to='/blog'>
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
						banner
					}
				}
			}
		}
	}
`;

export default HomePage;
