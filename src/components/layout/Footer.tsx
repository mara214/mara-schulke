import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { graphql, useStaticQuery, Link } from 'gatsby';
import { SocialIcon } from 'react-social-icons';

import { rem } from 'lib/polished';
import { mobile } from 'lib/media';

import Container from 'components/layout/Container';
import { RichText, asText } from 'components/core/RichText';
import { href } from 'utils/prismic/config';

interface FooterProps {}

const StyledSocialIcon = styled(SocialIcon)`
	.social-container .social-svg-mask {
		display: none !important;
	}

	.social-container .social-svg-icon {
		fill: ${props => props.theme.colors.foreground} !important;
		transition: none !important;
		transform-origin: center;
		transform: scale(1.5);
	}

	&:hover .social-container .social-svg-icon {
		fill: ${props => props.theme.colors.highlight} !important;
	}
`;

const FooterWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;

	p {
		font-size: ${rem(12)};
		margin: 0;
	}

	ul {
		margin: 0;
		display: flex;

		li {
			margin: 0;
			margin-right: ${props => rem(props.theme.spacings.small)};
			list-style: none;

			&:last-child {
				margin-right: 0;
			}
		}
	}

	${mobile} {
		flex-direction: column;

		ul {
			margin-top: ${props => rem(props.theme.spacings.small)};
		}
	}
`;

const Footer: FunctionComponent<FooterProps> = () => {
	const data = useStaticQuery(graphql`
		{
			prismic {
				allFooters {
					edges {
						node {
							trademark
							internalPageLinks {
								internalPageLink {
									... on PRISMIC_Page {
										_meta {
											...DocumentMeta
										}
										title
									}
								}
							}
							socialMedia {
								socialMediaLink {
									... on PRISMIC__ExternalLink {
										url
									}
								}
							}
						}
					}
				}
			}
		}
	`);

	const content = data.prismic.allFooters.edges[0].node;

	const renderInternalPageLinks = () => (
		<ul
			css={`
				margin-left: ${(props: any) => rem(props.theme.spacings.small)} !important;
			`}>
			{content.internalPageLinks.map((entry: any) => (
				<li key={entry.internalPageLink._meta.uid}>
					<p>
						<Link to={href(entry.internalPageLink._meta)}>{asText(entry.internalPageLink.title)}</Link>
					</p>
				</li>
			))}
		</ul>
	);

	const renderSocialMediaIconList = () => (
		<ul>
			{content.socialMedia.map((entry: any) => (
				<li key={entry.socialMediaLink.url}>
					<StyledSocialIcon
						url={entry.socialMediaLink.url}
						target='_blank'
						style={{ width: rem(30), height: rem(30) }}
					/>
				</li>
			))}
		</ul>
	);

	return (
		<Container>
			<hr style={{ marginTop: 0 }} />
			<FooterWrapper>
				<div
					css={`
						display: flex;
						align-items: center;

						${mobile} {
							flex-direction: column;
							ul {
								margin-left: 0 !important;
							}
						}
					`}>
					<RichText render={content.trademark} />
					{renderInternalPageLinks()}
				</div>
				{renderSocialMediaIconList()}
			</FooterWrapper>
		</Container>
	);
};

export default Footer;
