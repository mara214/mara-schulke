import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

import { rem } from 'lib/polished';
import { Link } from 'gatsby';

interface ArticleListItemProps {
	className?: string;
	title: string;
	published: string;
	slug: string;
	category: {
		name: string;
		slug: string;
		color: string;
	};
	withCategory: boolean;
	timeToRead: number;
}

const ArticleListItem: FunctionComponent<ArticleListItemProps> = ({ className, title, published, slug, category, withCategory, timeToRead }) => (
	<li className={className} key={slug}>
		<Link to={slug}><h3>{title}</h3></Link>
		<code>-- {published} • {timeToRead} min{withCategory ? <> • <Link to={category.slug}>{category.name}</Link></> : null }</code>
	</li>
);


export default styled(ArticleListItem)<ArticleListItemProps>`
	display: block;
	margin-bottom: ${(props: any) => rem(props.theme.spacings.medium)};

	h3 {
		margin: 0;
	}
`;