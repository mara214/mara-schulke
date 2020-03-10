import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { rem } from 'lib/polished';

import { asText } from 'components/core/RichText';
import { Link } from 'gatsby';
import { href } from 'utils/prismic/config';
import { Document } from 'prismic-javascript/d.ts/documents';

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
		_meta: Document;
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

const BlogPostListItem: FunctionComponent<BlogPostListItemProps> = ({ post, className }) => (
	<div className={className}>
		<BlogPostListItemContentContainer>
			{post.image ? (
				<p className='image mobile-fullscreen-image'>
					<Link to={href(post._meta)}>
						<img src={post.image.teaser.url} />
					</Link>
				</p>
			) : null}
			<div className='content'>
				<Link to={href(post._meta)}>
					<h2>{asText(post.title)}</h2>
				</Link>
				<p>{post.description}</p>
			</div>
		</BlogPostListItemContentContainer>
		<div>
			<Link to={href(post._meta)}>Read Article →</Link>
		</div>
	</div>
);

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
