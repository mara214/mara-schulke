import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { useStaticQuery, graphql, Link } from 'gatsby';

import ArticleListItem from './ArticleListItem';


interface ArticleListProps {
	className?: string;
	withCategory?: boolean;
	filter?: (article: any) => boolean;
	max?: number;
}

const ArticleList: FunctionComponent<ArticleListProps> = ({ className, filter = () => true, withCategory, max }) => {
	const data = useStaticQuery(graphql`
		{
			articles: allArticle(sort: {order: DESC, fields: published}) {
				edges {
					node {
						title
						excerpt
						slug
						featured
						timeToRead
						category {
							name
							slug
							color
						}
						published(formatString: "MMM, DD, YYYY")
					}
				}
			}
		}
	`);
	const { edges } = data.articles;
	const renderedEdges = edges
		.map(({ node }: any) => node)
		.filter(filter)
		.map((article: any) => <ArticleListItem {...article} withCategory={withCategory} key={article.slug}/>)
		.slice(0, max ? max : edges.length)

	return (
		<ul className={className}>{renderedEdges}</ul>
	);
}

export default styled(ArticleList)<ArticleListProps>``;