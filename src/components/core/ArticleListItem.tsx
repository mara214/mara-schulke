import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

import { rem } from 'lib/polished';

interface ArticleListItemProps {
	className?: string;
	title: string;
	published: string;
	slug: string;
	timeToRead: number;
}

const ArticleListItem: FunctionComponent<ArticleListItemProps> = ({ className, title, published, slug, timeToRead }) => (
	<Link className={className} to={slug} key={slug} css={`display: block; margin-bottom: ${(props: any) => rem(props.theme.spacings.medium)};`}>
		<h3 css={`margin: 0;`}>{title}</h3>
		<code>// {published} • {timeToRead} min</code>
	</Link>
);


export default styled(ArticleListItem)<ArticleListItemProps>``;