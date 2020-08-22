import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { Link, useStaticQuery } from 'gatsby';
import Cookies from 'js-cookie';

import { rem } from 'lib/polished';
import { mobile } from 'lib/media';

import Container from 'components/layout/Container';
import { graphql } from 'gatsby';


const FooterContainer = styled.div`
	background-color: ${props => props.theme.colors.navigationBackground};

	&, * {
		color: ${props => props.theme.colors.navigationForeground};
	}

	${Container} {
		display: flex;
		justify-content: space-between;

		${mobile} {
			flex-direction: column;
		}
	}

	pre {
		padding: 0;
		margin: 0;
	}

	ul {
		display: grid;
		grid-gap: ${props => rem(props.theme.spacings.xsmall)};
		margin: 0;

		li {
			list-style: none;
			margin: 0;
			white-space: nowrap;

			button {
				cursor: pointer;
				padding: 0;
				outline: none;
				background: none;

				&:hover {
					text-decoration: underline;
				}
			}
		}
	}
`;


interface FooterProps {}


const Footer: FunctionComponent<FooterProps> = () => {
	const {legal, social} = useStaticQuery(graphql`
		{
			site {
				siteMetadata {
					footer {
						legal {
							slug
							title
						}

						social {
							href
							title
						}
					}
				}
			}
		}
	`).site.siteMetadata.footer;

	const binaryYear = (new Date().getFullYear() >>> 0).toString(2);
	const clearCookies = () => {
		Object.keys(Cookies.getJSON())
			.filter(name => name !== 'theme')
			.map(name => Cookies.remove(name));
		window.location.reload();
	}

	return (
		<FooterContainer>
			<Container>
				<pre>{binaryYear}</pre>
				<div
					css={`
						width: min-content;
						display: grid;
						grid-template-columns: auto auto;
						grid-gap: ${(props: any) => rem(props.theme.spacings.large)};

						${mobile} {
							margin-top: ${(props: any) => rem(props.theme.spacings.medium)};
						}
					`}
				>
					<ul>
						{legal.map(({title, slug}: any) => (
							<li key={slug}>
								<Link to={slug}>
									<code>{title}</code>
								</Link>
							</li>
						))}
						<li>
							<button type="button" onClick={clearCookies}>
								<code>Revoke Consent</code>
							</button>
						</li>
					</ul>
					<ul>
						{social.map(({title, href}: any) => (
							<li key={href}>
								<a href={href} target="__blank" rel="noopener">
									<code>{title}</code>
								</a>
							</li>
						))}
					</ul>
				</div>
			</Container>
		</FooterContainer>
	);
};

export default Footer;
