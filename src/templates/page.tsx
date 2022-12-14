import React, { FunctionComponent } from 'react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';

import Layout from 'layouts/default';
import SEO from 'components/layout/SEO';
import Stage from 'components/core/Stage';


interface PageProps {
	data: any;
	location: any;
}

const Page: FunctionComponent<PageProps> = ({ data, location }) => {
	return (
		<Layout hasStage>
			<SEO
				title={data.page.title}
				description={data.page.excerpt}
				url={location.href ?? ''}
			/>
			<Stage title={data.page.title} />
			<MDXRenderer>{data.page.body}</MDXRenderer>
		</Layout>
	);
};

export const query = graphql`
	query PageQuery($slug: String!) {
		page(slug: { eq: $slug }) {
			slug
			title
			excerpt
			body
		}
	}
`;

export default Page;
