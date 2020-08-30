import React, { FunctionComponent } from 'react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';

import Layout from 'layouts/default';
import SEO from 'components/layout/SEO';
import Support from 'components/core/Support';
import Stage from 'components/core/Stage';

interface ArticleProps {
	data: any;
	location: any;
}

const Article: FunctionComponent<ArticleProps> = ({ data, location }) => {
	const tags: string[] = [];
	const { publicURL: image } = data.article.banner || {};

	const meta: object[] = [
		{
			property: 'article:author',
			content: data.site.siteMetadata.seo.author
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
		<Layout hasStage={true}>
			<SEO
				title={data.article.title}
				description={data.article.excerpt}
				image={image ?? ''}
				meta={meta}
				url={location.href ?? ''}
				type="article"
			/>
			{/* 
				<div
				css={`
					height: 300px;
					
					img {
						display: block;
						height: 100%;
						width: 100%;
						object-fit: cover;
						margin: 0;
					}
				`}
			>
				<img src={image}></img>
			</div> */}
			<Stage
				title={data.article.title}
			/>
			<MDXRenderer>{data.article.body}</MDXRenderer>
			<Support />
		</Layout>
	);
};

export const query = graphql`
	query ArticleQuery($slug: String!) {
		site {
			siteMetadata {
				seo {
					author
				}
			}
		}

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
