import React, { FunctionComponent } from 'react';
import styled, { css } from 'styled-components';
import { rem, transparentize } from 'polished';

import { mobile } from 'lib/media';
import { asText } from 'components/core/RichText';
import { Link } from 'gatsby';

interface BlogPostListItemProps {
	post: {
		title: any;
		description: any;
		_meta: {
			uid: string;
		};
	};
}

const BlogPostListItem: FunctionComponent<BlogPostListItemProps> = ({ post }) => (
	<div style={{ marginBottom: 40 }}>
		<h2>{asText(post.title)}</h2>
		<p>{asText(post.description)}</p>
		<Link to={`/post/${post._meta.uid}`}>Read Article</Link>
	</div>
);

export default styled(BlogPostListItem)<BlogPostListItemProps>`
	color: red;
`;
