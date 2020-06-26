import React, { FunctionComponent } from 'react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';

import Layout from 'layouts/default';
import SEO from 'components/layout/SEO';
import Stage from 'components/core/Stage';
import Particles from 'components/core/Particles';

interface PageProps {
	data: any;
}

const Page: FunctionComponent<PageProps> = ({ data }) => {
	return (
		<Layout hasStage>
			<SEO title={data.page.title} description={data.page.excerpt} />
			<Stage title={data.page.title} particles />
			<MDXRenderer>{data.page.body}</MDXRenderer>
		</Layout>
	);};

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
