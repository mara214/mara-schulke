import React, { FunctionComponent } from 'react';
import PrismicRichText from 'prismic-richtext';

import { Layout } from 'layouts/default';
import { graphql } from 'gatsby';

interface HomePageProps {
	data: any;
}

const HomePage: FunctionComponent<HomePageProps> = ({ data }) => (
	<Layout>
		<pre>{JSON.stringify(data, null, 4)}</pre>
	</Layout>
);

export const query = graphql`
	{
		prismic {
			allHomePages(uid: null) {
				edges {
					node {
						title
						intoduction
					}
				}
			}
		}
	}
`;

export default HomePage;
