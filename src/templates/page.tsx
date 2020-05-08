import React, { FunctionComponent } from 'react';
import { graphql } from 'gatsby';

// import Layout from 'layouts/default';

interface PageProps {
	data: any;
}

const Page: FunctionComponent<PageProps> = ({ data }) => {
	return <pre>{JSON.stringify(data, null, 4)}</pre>
};

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
