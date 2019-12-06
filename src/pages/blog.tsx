import React, { FunctionComponent } from 'react';
import { graphql } from 'gatsby';
import { Link } from 'gatsby';
import styled from 'styled-components';

import { Layout } from 'layouts/default';
import { RichText } from 'components/core/RichText';

import BlogPostListItem from 'components/core/BlogPostListItem';
import SEO from 'components/layout/SEO';

interface BlogProps {
	data: any;
}

const BlogContainer = styled.div`
	h1 {
		margin-top: 0;
	}
`;

const Blog: FunctionComponent<BlogProps> = ({ data }) => {
	const posts = data.prismic.allBlogPosts.edges.map((el: any) => el.node);

	return (
		<Layout>
			<BlogContainer>
				<SEO lang='en' title='Blog' />

				{posts.map((post: any) => (
					<BlogPostListItem key={post._meta.uid} post={post} />
				))}
				<hr />
			</BlogContainer>
		</Layout>
	);
};

export const query = graphql`
	{
		prismic {
			allBlogPosts(last: 50) {
				edges {
					node {
						_meta {
							uid
						}
						date
						image
						title
						description
					}
				}
			}
		}
	}
`;

export default Blog;
