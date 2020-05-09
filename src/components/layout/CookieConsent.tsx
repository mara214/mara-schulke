import React, { FunctionComponent, useState } from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import Cookies from 'js-cookie';

import { rem } from 'lib/polished';
import { landscape } from 'lib/media';

import Container from 'components/layout/Container';
import Button from 'components/ui/Button';

const CookieConsentContainer = styled.div`
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;

	box-shadow: ${props => props.theme.boxShadow.default};
	border-top: 1px solid ${props => props.theme.colors.state.muted};
	background-color: ${props => props.theme.colors.background};

	${Container} {
		padding-top: ${props => rem(props.theme.spacings.medium)};
		padding-bottom: ${props => rem(props.theme.spacings.medium)};
	}
`;

const CookieConsent: FunctionComponent<{}> = () => {
	const [accepted, setAccepted] = useState(() => Cookies.get('cookie-consent') || false);
	const acceptCookieConsent = ev => {
		ev.preventDefault();
		Cookies.set('cookie-consent', 'true');
		setAccepted(true);
	};

	if (accepted) return <></>;

	return (
		<CookieConsentContainer>
			<Container
				slim
				css={`
					display: flex;
					align-items: center;
					justify-content: space-between;

					${landscape} {
						flex-direction: column;
						justify-content: unset;
						align-items: unset;
					}
				`}>
				<span
					css={`
						display: block;
						height: min-content;
						margin-right: ${(props: any) => rem(props.theme.spacings.small)};

						${landscape} {
							margin-bottom: ${(props: any) => rem(props.theme.spacings.small)};
							margin-right: 0;
						}
					`}>
					This site is collecting data to enhance your experience and using cookies to save user preferences across browser sessions.
				</span>
				<div
					css={`
						display: flex;
						align-items: center;

						a {
							margin-bottom: 0;
							text-align: center;
							white-space: nowrap;

							&:first-child {
								margin-right: ${(props: any) => rem(props.theme.spacings.small)};
							}
						}
					`}>
					<a href="" onClick={acceptCookieConsent}><code>accept()</code></a>
					<Link to='/data-privacy'><code>learn_more()</code></Link>
				</div>
			</Container>
		</CookieConsentContainer>
	);
};

export default CookieConsent;
