import React, { FunctionComponent } from 'react';

import BlogPostListItem from 'components/core/BlogPostListItem';

import { rem } from 'lib/polished';

interface RelatedBlogPostsProps {
	posts: any;
}

const RelatedBlogPosts: FunctionComponent<RelatedBlogPostsProps> = ({ posts }) => (
	<div
		css={`
			& > h2 {
				text-align: center;
				margin: 0 0 ${(props: any) => rem(props.theme.spacings.large)} 0;
			}
		`}>
		<h2>Related Articles</h2>
		<ul
			css={`
				margin: 0;
			`}>
			{posts.edges.map((edge: any) => (
				<BlogPostListItem key={edge.node._meta.uid} post={edge.node} />
			))}
		</ul>
	</div>
);

export default RelatedBlogPosts;
