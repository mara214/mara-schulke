import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';

import Layout from 'layouts/default';

interface ArticleProps {
	data: any;
}

const Article: FunctionComponent<ArticleProps> = ({ data }) => {
	return (
		<Layout>
			<MDXRenderer>{data.article.body}</MDXRenderer>
		</Layout>
	);
};

export const query = graphql`
	query ArticleQuery($slug: String!) {
		article(slug: { eq: $slug }) {
			slug
			title
			body
			timeToRead
		}
	}
`;

export default Article;
