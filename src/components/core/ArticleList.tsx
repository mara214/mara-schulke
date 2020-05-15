import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { useStaticQuery, graphql, Link } from 'gatsby';

import { rem } from 'lib/polished';
import ArticleListItem from './ArticleListItem';

interface ArticleListProps {
	className?: string;
	filter?: (article: any) => boolean
}

const ArticleList: FunctionComponent<ArticleListProps> = ({ filter = () => true }) => {
	const data = useStaticQuery(graphql`
		{
			articles: allArticle {
				edges {
					node {
						title
						excerpt
						slug
						featured
						timeToRead
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
		.map((article: any) => <ArticleListItem {...article} key={article.slug}/>);
}

export default styled(ArticleList)<ArticleListProps>``;