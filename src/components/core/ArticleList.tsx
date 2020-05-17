import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { useStaticQuery, graphql, Link } from 'gatsby';

import { rem } from 'lib/polished';
import ArticleListItem from './ArticleListItem';

interface ArticleListProps {
	className?: string;
	withCategory?: boolean;
	filter?: (article: any) => boolean
}

const ArticleList: FunctionComponent<ArticleListProps> = ({ filter = () => true, withCategory }) => {
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
						published(formatString: "MMM DD, YYYY")
					}
				}
			}
		}
	`);
	const { edges } = data.articles;
	return edges
		.map(({ node }: any) => node)
		.filter(filter)
		.map((article: any) => <ArticleListItem {...article} withCategory={withCategory} key={article.slug}/>);
}

export default styled(ArticleList)<ArticleListProps>``;