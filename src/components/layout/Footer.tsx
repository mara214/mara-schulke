import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { graphql, useStaticQuery } from 'gatsby';
import { SocialIcon } from 'react-social-icons';
import { rem } from 'polished';

import Container from 'components/layout/Container';
import { RichText } from 'components/core/RichText';
import { cols } from 'lib/flex';
import { desktop, mobile } from 'lib/media';

interface FooterProps {}

const StyledSocialIcon = styled(SocialIcon)`
	.social-container .social-svg-mask {
		fill: ${props => props.theme.colors.foreground} !important;
		transition: none !important;
	}

	&:hover .social-container .social-svg-mask {
		fill: ${props => props.theme.colors.highlight} !important;
	}
`;

const FooterContent = styled.div`
	display: flex;
	flex-direction: column;
	width: ${cols(10)};
	margin-top: ${props => rem(props.theme.spacings.large)};

	h2 {
		margin-top: 0;
	}

	${desktop} {
		padding-right: ${props => rem(props.theme.spacings.medium)};
	}
`;

const FooterCTAImage = styled.div`
	width: ${cols(2)};

	${mobile} {
		display: none;
	}
`;

const FooterEnding = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: ${props => rem(props.theme.spacings.large)};

	p {
		font-size: ${rem(12)};
		margin: 0;
	}

	ul {
		margin: 0;
		display: flex;

		li {
			margin: 0;
			margin-right: ${props => rem(props.theme.spacings.medium)};
			list-style: none;

			&:last-child {
				margin-right: 0;
			}
		}
	}
`;

const Footer: FunctionComponent<FooterProps> = props => {
	const data = useStaticQuery(graphql`
		{
			prismic {
				allFooters {
					edges {
						node {
							title
							description
							trademark
							social_media {
								social_media_link {
									... on PRISMIC__ExternalLink {
										_linkType
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

	const renderSocialMediaIconList = () => (
		<ul>
			{content.social_media.map((entry: any) => (
				<li key={entry.social_media_link.url}>
					<StyledSocialIcon
						url={entry.social_media_link.url}
						target='_blank'
						style={{ width: rem(30), height: rem(30) }}
					/>
				</li>
			))}
		</ul>
	);

	return (
		<Container slim>
			<div style={{ display: 'flex' }}>
				<FooterContent>
					<RichText render={content.title} />
					<RichText render={content.description} />
				</FooterContent>
				<FooterCTAImage></FooterCTAImage>
			</div>
			<FooterEnding>
				<RichText render={content.trademark} />
				{renderSocialMediaIconList()}
			</FooterEnding>
		</Container>
	);
};

export default Footer;
