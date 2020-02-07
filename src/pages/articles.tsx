import React, { FunctionComponent } from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';

import { Layout } from 'layouts/default';

import BlogPostListItem from 'components/core/BlogPostListItem';
import SEO from 'components/layout/SEO';

interface LatestProps {
	data: any;
	location: any;
}

const LatestContainer = styled.div`
	h1 {
		margin-top: 0;
	}
`;

const Latest: FunctionComponent<LatestProps> = ({ data, location }) => {
	const posts = data.prismic.allBlogPosts.edges.map((el: any) => el.node);

	return (
		<Layout location={location}>
			<LatestContainer>
				<SEO lang='en' title='Blog' />

				{posts.map((post: any) => (
					<BlogPostListItem key={post._meta.uid} post={post} />
				))}
				<hr />
			</LatestContainer>
		</Layout>
	);
};

export const query = graphql`
	{
		prismic {
			allBlogPosts(lang: "en-us") {
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

export default Latest;
