import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { graphql } from 'gatsby';

import { Layout } from 'layouts/default';
import { RichText, asText } from 'components/core/RichText';

import SEO from 'components/layout/SEO';

import TextSlice from 'components/slices/Text';
import ImageSlice from 'components/slices/Image';
import CodeSlice from 'components/slices/Code';
import Share from 'components/core/Share';
import PageTitle from 'components/core/PageTitle';
import RelatedBlogPosts from 'components/core/RelatedBlogPosts';

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

			case 'image':
				return <ImageSlice key={index} slice={slice} />;

			case 'code':
				return <CodeSlice key={index} slice={slice} />;

			default:
				return <></>;
		}
	});
};

const BlogPost: FunctionComponent<BlogPostProps> = ({ data, location }) => {
	if (!data.prismic.post.edges[0]) {
		return <p>404</p>;
	}

	const post = data.prismic.post.edges[0].node;
	const { related } = data.prismic;

	const hasRelated = related.totalCount > 0;

	return (
		<Layout location={location}>
			<BlogPostContainer>
				<SEO lang='en' title={asText(post.title)} />
				<PageTitle title={post.title} />
				{post.image ? (
					<p className='mobile-fullscreen-image'>
						<img src={post.image.url} />
					</p>
				) : null}
				{post.body ? <PostSlices slices={post.body} /> : null}
			</BlogPostContainer>
			<hr />
			<Share css={hasRelated ? `` : `margin-bottom: 0;`} />
			{hasRelated && (
				<>
					<hr />
					<RelatedBlogPosts posts={related} />
				</>
			)}
		</Layout>
	);
};

export const query = graphql`
	query BlogPostQuery($uid: String!, $id: String!) {
		prismic {
			related: allBlogPosts(similar: { documentId: $id, max: 3 }) {
				totalCount
				edges {
					node {
						_meta {
							...DocumentMeta
						}
						title
						description
						image
					}
				}
			}

			post: allBlogPosts(uid: $uid) {
				edges {
					node {
						_meta {
							...DocumentMeta
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

							... on PRISMIC_BlogPostBodyCode {
								type
								label
								primary {
									language
									code
									highlightStart
									highlightEnd
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
