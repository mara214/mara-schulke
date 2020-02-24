import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { rem } from 'lib/polished';

import { asText } from 'components/core/RichText';
import { Link } from 'gatsby';

interface BlogPostListItemProps {
	post: {
		title: any;
		description: any;
		image?: {
			teaser: {
				dimensions: {
					width: number;
					height: number;
				};
				url: string;
			};
		};
		_meta: {
			uid: string;
		};
	};
	className?: string;
}

const BlogPostListItemContentContainer = styled.div`
	display: flex;
	flex-direction: column;

	.image {
		img {
			display: block;
			width: 100%;
		}
	}

	.content {
		padding-right: 0;

		p {
			margin-bottom: ${props => rem(props.theme.spacings.medium)};
		}
	}
`;

const BlogPostListItem: FunctionComponent<BlogPostListItemProps> = ({ post, className }) => {
	const postHref = `/post/${post._meta.uid}`;

	return (
		<div className={className}>
			<BlogPostListItemContentContainer>
				{post.image ? (
					<p className='image mobile-fullscreen-image'>
						<Link to={postHref}>
							<img src={post.image.teaser.url} />
						</Link>
					</p>
				) : null}
				<div className='content'>
					<Link to={postHref}>
						<h2>{asText(post.title)}</h2>
					</Link>
					<p>{post.description}</p>
				</div>
			</BlogPostListItemContentContainer>
			<div>
				<Link to={postHref}>Read Article →</Link>
			</div>
		</div>
	);
};

export default styled(BlogPostListItem)<BlogPostListItemProps>`
	display: flex;
	flex-direction: column;
	margin-top: ${props => rem(props.theme.spacings.large)};

	h2 {
		margin-top: 0;
	}

	&:first-child {
		margin-top: 0;
	}
`;
