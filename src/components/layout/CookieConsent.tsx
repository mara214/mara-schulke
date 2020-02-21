import React, { FunctionComponent, useState } from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import Cookies from 'js-cookie';

import { rem } from 'lib/polished';

import Container from 'components/layout/Container';
import Button from 'components/ui/Button';
import { landscape } from 'lib/media';

const CookieConsentContainer = styled.div`
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;

	box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 40px;
	border-top: 1px solid ${props => props.theme.colors.muted};
	background-color: ${props => props.theme.colors.background};

	${Container} {
		padding-top: ${props => rem(props.theme.spacings.medium)};
		padding-bottom: ${props => rem(props.theme.spacings.medium)};
	}
`;

const CookieConsent: FunctionComponent<{}> = () => {
	const [accepted, setAccepted] = useState(() => Cookies.get('cookie-consent') || false);
	const acceptCookieConsent = () => {
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

						${landscape} {
							margin-bottom: ${(props: any) => rem(props.theme.spacings.small)};
						}
					`}>
					This site uses cookies to save user preferences across browser sessions
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
					<Button onClick={acceptCookieConsent}>Accept</Button>
					<Link to='/privacy-policy'>
						<Button muted>Learn More</Button>
					</Link>
				</div>
			</Container>
		</CookieConsentContainer>
	);
};

export default CookieConsent;
