import React, { FunctionComponent } from 'react';
import { graphql } from 'gatsby';

import { Layout } from 'layouts/default';
import { RichText, asText } from 'components/core/RichText';
import SEO from 'components/layout/SEO';

interface HomePageProps {
	data: any;
}

const HomePage: FunctionComponent<HomePageProps> = ({ data }) => {
	const document = data.prismic.allHomePages.edges[0].node;

	return (
		<Layout>
			<SEO lang='en' title={asText(document.title)} />

			<RichText render={document.title} />
			<RichText render={document.introduction} />
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
