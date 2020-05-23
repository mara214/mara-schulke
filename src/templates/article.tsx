import React, { FunctionComponent } from 'react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';

import Layout from 'layouts/default';
import SEO from 'components/layout/SEO';
import Support from 'components/core/Support';

interface ArticleProps {
	data: any;
}

const Article: FunctionComponent<ArticleProps> = ({ data }) => {
	const tags: string[] = [];
	const { publicURL: image } = data.article.banner || {};

	const meta: object[] = [
		{
			property: 'og:type',
			content: 'article'
		},
		{
			property: 'article:published_time',
			content: data.article.published
		},
		{
			property: 'article:section',
			content: 'article'
		},
		...tags.map(tag => ({
			property: 'article:tag',
			content: tag
		}))
	];

	if (data.article.modified)
		meta.push({
			property: 'article:modified_time',
			content: data.article.modified
		});

	return (
		<Layout hasStage={false}>
			<SEO
				title={data.article.title}
				description={data.article.excerpt}
				image={ image || ''}
				meta={meta}
			/>
			<h1>{data.article.title}</h1>
			<MDXRenderer>{data.article.body}</MDXRenderer>
			<Support />
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
			excerpt
			published
			modified
			banner {
				publicURL
			}
		}
	}
`;

export default Article;
