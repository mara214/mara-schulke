import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { useStaticQuery, graphql, Link } from 'gatsby';

import { rem } from 'lib/polished';

interface ArticleListProps {
	className?: string;
}

const ArticleList: FunctionComponent<ArticleListProps> = ({ className }) => {
	const data = useStaticQuery(graphql`
		{
			articles: allArticle {
				edges {
					node {
						title
						excerpt
						slug
						timeToRead
						published(formatString: "MMM DD, YYYY")
					}
				}
			}
		}
	`);

	const articles = data.articles.edges.map(({ node: { title, published, timeToRead, slug } }: any) => (
		<Link to={slug} key={slug} css={`display: block; margin-bottom: ${(props: any) => rem(props.theme.spacings.medium)};`}>
			<h3 css={`margin: 0;`}>{title}</h3>
			<code>// {published} • {timeToRead} min</code>
		</Link>
	));

	return articles;
}

export default styled(ArticleList)<ArticleListProps>`
`;
