import React, { FunctionComponent, useState } from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';
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
	const data = {};

	return 'lol';

	const [accepted, setAccepted] = useState(() => Cookies.get('cookie-consent') || false);
	const acceptCookieConsent = () => {
		Cookies.set('cookie-consent', 'true');
		setAccepted(true);
	};

	if (accepted) return <></>;

	const content = data.prismic.allCookieConsents.edges[0].node;

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

						${landscape} {
							margin-bottom: ${(props: any) => rem(props.theme.spacings.small)};
						}
					`}>
					{content.info}
				</span>
				<div
					css={`
						display: flex;
						align-items: center;

						${Button} {
							margin-bottom: 0;
							text-align: center;

							&:first-child {
								margin-right: ${(props: any) => rem(props.theme.spacings.small)};
							}
						}
					`}>
					<Button onClick={acceptCookieConsent}>{content.acceptCta}</Button>
					<Link to={content.privacyPolicy._meta}>
						<Button muted>{content.learnMoreCta}</Button>
					</Link>
				</div>
			</Container>
		</CookieConsentContainer>
	);
};

export default CookieConsent;
