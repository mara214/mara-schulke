import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import { SocialIcon } from 'react-social-icons';

import { rem } from 'lib/polished';
import { mobile, tablet } from 'lib/media';

import Container from 'components/layout/Container';

const FooterContainer = styled.div`
	&, * {
		color: ${props => props.theme.colors.navigationForeground};
		background-color: ${props => props.theme.colors.navigationBackground};
	}

	ul {
		margin: 0;

		li {
			list-style: none;
			padding-right: ${props => rem(props.theme.spacings.medium)};

			&:last-child {
				padding: 0;
			}
		}
	}
`;

interface FooterProps {}

const Footer: FunctionComponent<FooterProps> = () => {
	const renderLink = ({ to, text }: { to: string; text: string; }) => <li><Link to={to}>{text}</Link></li>;

	return (
		<FooterContainer>
			<Container css={`padding-bottom: 0;`}>
				<hr/>
				<pre css={`padding: 0;`}>
					// Subscribe to my newsletter<br/>
					// Buy my book
				</pre>
				<hr/>
			</Container>

			<Container 
				css={`
					display: flex;
					justify-content: space-between;

					${mobile} {
						flex-direction: column;
						ul {
							justify-content: start;
						}
					}
				`}
			>
				<div css={`display: flex; ${mobile} { margin-bottom: ${(props: any) => rem(props.theme.spacings.small)}}`}>
					<code>maximilian::schulke(2020)</code>
				</div>
				<ul css={`display: flex; justify-content: end; ${tablet} { li {margin: 0;} }`}>
					{renderLink({ to: '/', text: 'GitHub' })}
					{renderLink({ to: '/', text: 'Reddit' })}
					{renderLink({ to: '/imprint', text: 'Imprint' })}
					{renderLink({ to: '/data-privacy', text: 'Data Privacy' })}
				</ul>
			</Container>
		</FooterContainer>
	);
};

export default Footer;
