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
import RelatedBlogPosts from 'components/core/RelatedBlogPosts';

import { rem } from 'lib/polished';

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

const BlogPostHeader: FunctionComponent<{ title: any; className?: string }> = ({ title, className }) => (
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
	const { related } = data.prismic;

	return (
		<Layout location={location}>
			<BlogPostContainer>
				<SEO lang='en' title={asText(post.title)} />
				<StyledBlogPostHeader title={post.title} />
				{post.image ? (
					<p className='mobile-fullscreen-image'>
						<img src={post.image.url} />
					</p>
				) : null}
				{post.body ? <PostSlices slices={post.body} /> : null}
			</BlogPostContainer>
			<hr />
			<Share />
			<hr />
			{related.totalCount > 0 && <RelatedBlogPosts posts={related} />}
			<hr />
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
							id
							uid
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
