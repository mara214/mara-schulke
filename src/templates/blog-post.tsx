import React, { FunctionComponent } from 'react';
import { graphql } from 'gatsby';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { rem } from 'lib/polished';

import { Layout } from 'layouts/default';
import { RichText } from 'components/core/RichText';

import SEO from 'components/layout/SEO';

import TextSlice from 'components/slices/Text';
import ImageSlice from 'components/slices/Image';

interface BlogPostProps {
	data: any;
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

const BlogPostHeader: FunctionComponent<{ title: any; date: any; className?: string }> = ({
	title,
	date,
	className
}) => (
	<div className={className}>
		<RichText render={title} />
		<span>
			{date
				.split('-')
				.reverse()
				.join('/')}
		</span>
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

const BlogPost: FunctionComponent<BlogPostProps> = ({ data }) => {
	if (!data.prismic.allBlogPosts.edges[0]) {
		throw JSON.stringify(data, null, 4);
		return (
			<div>
				<h2>something went wrong </h2>
				<pre>{JSON.stringify(data, null, 4)}</pre>
			</div>
		);
	}

	const post = data.prismic.allBlogPosts.edges[0].node;

	return (
		<Layout>
			<BlogPostContainer>
				<SEO lang='en' title='Blog' />

				<StyledBlogPostHeader title={post.title} date={post.date} />

				{post.image ? (
					<p className='mobile-fullscreen-image'>
						<img src={post.image.url} />
					</p>
				) : null}

				{post.body ? <PostSlices slices={post.body} /> : null}
			</BlogPostContainer>
		</Layout>
	);
};

export const query = graphql`
	query BlogPostQuery($uid: String) {
		prismic {
			allBlogPosts(uid: $uid) {
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
