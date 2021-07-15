import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { Link, useStaticQuery } from 'gatsby';
import Cookies from 'js-cookie';

import { rem } from 'lib/polished';
import { mobile } from 'lib/media';

import Container from 'components/layout/Container';
import { graphql } from 'gatsby';


const FooterContainer = styled.div`
	${Container} {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	pre {
		padding: 0;
		margin: 0;
	}

	hr {
		margin-top: 0;
	}

	ul {
		display: flex;
		width: 100%;
		margin: 0;
		gap: ${props => rem(props.theme.spacings.medium)};

		${mobile} {
			gap: ${props => rem(props.theme.spacings.small)};
			flex-direction: column;
		}

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

	const clearCookies = () => {
		Object.keys(Cookies.getJSON())
			.filter(name => name !== 'theme')
			.map(name => Cookies.remove(name));
		window.location.reload();
	}

	return (
		<FooterContainer>
			<Container>
				<hr />
				<ul>
					{legal.map(({title, slug}: any) => (
						<li key={slug}>
							<Link to={slug}>
								<code>{title}</code>
							</Link>
						</li>
					))}
					<li key="consent">
						<button type="button" onClick={clearCookies}>
							<code>Revoke Consent</code>
						</button>
					</li>
					{social.map(({title, href}: any) => (
						<li key={href}>
							<a href={href} target="__blank" rel="noopener">
								<code>{title}</code>
							</a>
						</li>
					))}
				</ul>
			</Container>
		</FooterContainer>
	);
};

export default Footer;
