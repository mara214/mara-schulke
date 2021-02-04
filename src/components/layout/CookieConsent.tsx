import React, { FunctionComponent, useState, useEffect } from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import Cookies from 'js-cookie';

import { rem } from 'lib/polished';
import { landscape } from 'lib/media';

import Container from 'components/layout/Container';


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
	const [answered, setAnswered] = useState(() => !!Cookies.get('cookie-consent') || false);

	const storeAnswer = (answer: boolean) => (ev: MouseEvent) => {
		ev.preventDefault();
		Cookies.set('cookie-consent', '' + answer, {
			expires: 365
		});
		setAnswered(true);
	};

	useEffect(() => {
		if (!answered) return;

		const accepted = Cookies.get('cookie-consent') === 'true';

		if (!accepted) {
			return;
		}

		(async () => {
			const {default: withAnalytics} = await import('lib/analytics');

			withAnalytics(analytics => {
				analytics.page();
			});
		})();
	}, [answered]);

	if (answered) return <></>;

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
					This site want's to collect data to enhance your experience and use cookies to save your preferences across browser sessions.
					If you are curious how and what data get's collected you should checkout <Link to="/data-privacy">this page</Link>.
					Your data may be stored on servers outside of the european union.
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
					<a href="" onClick={storeAnswer(true) as any}><code>accept()</code></a>
					<a href="" onClick={storeAnswer(false) as any}><code>deny()</code></a>
				</div>
			</Container>
		</CookieConsentContainer>
	);
};

export default CookieConsent;
