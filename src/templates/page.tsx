import React, { FunctionComponent } from 'react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';

import Layout from 'layouts/default';

interface PageProps {
	data: any;
}

const Page: FunctionComponent<PageProps> = ({ data }) => {
	return (
		<Layout readMode={false}>
			<MDXRenderer>{data.page.body}</MDXRenderer>
		</Layout>
	);};

export const query = graphql`
	query PageQuery($slug: String!) {
		page(slug: { eq: $slug }) {
			slug
			title
			body
		}
	}
`;

export default Page;
