import React, { FunctionComponent } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { rem } from 'lib/polished';

import { Layout } from 'layouts/default';
import { RichText, asText } from 'components/core/RichText';

import SEO from 'components/layout/SEO';

import TextSlice from 'components/slices/Text';
import ImageSlice from 'components/slices/Image';

interface BlogPostProps {
	data: any;
	location: any;
}

const BlogPostContainer = styled.div`
	h1 {
		margin-top: 0;
	}
`;

const PostSlices: FunctionComponent<{ slices: any }> = ({ slices }) => {
	return slices.map((slice: any, index: number) => {
		switch (slice.type) {
			case 'text':
				return <TextSlice key={index} slice={slice} />;

			default:
				return <ImageSlice key={index} slice={slice} />;
		}
	});
};

const BlogPostHeader: FunctionComponent<{ title: any; date: any; className?: string }> = ({ title, className }) => (
	<div className={className}>
		<RichText render={title} />
	</div>
);

const StyledBlogPostHeader = styled(BlogPostHeader)`
	margin-bottom: ${props => rem(props.theme.spacings.large)};

	&,
	h1,
	span {
		text-align: center;
	}

	h1 {
		margin-bottom: ${props => rem(props.theme.spacings.small)};
	}

	span {
		font-size: ${rem(12)};
	}
`;

const BlogPost: FunctionComponent<BlogPostProps> = ({ data, location }) => {
	if (!data.prismic.post.edges[0]) {
		return <p>404</p>;
	}

	const post = data.prismic.post.edges[0].node;
	const { similar } = data.prismic;

	return (
		<Layout location={location}>
			<BlogPostContainer>
				<SEO lang='en' title={asText(post.title)} />
				<StyledBlogPostHeader title={post.title} date={post.date} />
				{post.image ? (
					<p className='mobile-fullscreen-image'>
						<img src={post.image.url} />
					</p>
				) : null}
				{post.body ? <PostSlices slices={post.body} /> : null}
				<hr />
				Similar Documents: {similar.totalCount} (Shouldnt be shown if 0)
				<ul>
					{similar.edges.map((edge: any) => (
						<li key={edge.node._meta.uid}>{asText(edge.node.title)}</li>
					))}
				</ul>
			</BlogPostContainer>
		</Layout>
	);
};

export const query = graphql`
	query BlogPostQuery($uid: String!, $id: String!) {
		prismic {
			similar: allBlogPosts(similar: { documentId: $id, max: 3 }) {
				totalCount
				edges {
					node {
						_meta {
							uid
						}
						title
					}
				}
			}

			post: allBlogPosts(uid: $uid) {
				edges {
					node {
						_meta {
							id
							uid
							type
						}
						title
						date
						image
						body {
							... on PRISMIC_BlogPostBodyText {
								type
								label
								primary {
									content
								}
							}
							... on PRISMIC_BlogPostBodyImage {
								type
								label
								primary {
									image
									description
								}
							}
						}
					}
				}
			}
		}
	}
`;

export default BlogPost;
