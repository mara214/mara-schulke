import React, { FunctionComponent } from 'react';
import { useStaticQuery } from 'gatsby';

import Button from 'components/ui/Button';

import { rem } from 'lib/polished';
import { landscape } from 'lib/media';
import { graphql } from 'gatsby';
import { asText } from 'components/core/RichText';

const Share: FunctionComponent<{ className?: string }> = ({ className }) => {
	const data = useStaticQuery(graphql`
		{
			prismic {
				allSharePosts(lang: "en-us") {
					edges {
						node {
							cta
							ctaAction {
								... on PRISMIC__ExternalLink {
									url
								}
							}
							info
							title
						}
					}
				}
			}
		}
	`);

	const doc = data.prismic.allSharePosts.edges[0].node;

	return (
		<div
			className={className}
			css={`
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				margin: ${(props: any) => rem(props.theme.spacings.large)} 0;

				h2,
				p {
					margin-top: 0;
				}

				p {
					margin-bottom: ${(props: any) => rem(props.theme.spacings.medium)};
					max-width: 50%;
					text-align: center;

					${landscape} {
						max-width: 100%;
					}
				}

				${Button} {
					margin-bottom: 0;
				}
			`}>
			<h2>{asText(doc.title)}</h2>
			<p>{asText(doc.info)}</p>
			<a href={doc.ctaAction.url} target='__blank'>
				<Button>{doc.cta}</Button>
			</a>
		</div>
	);
};

export default Share;
