import React, { FunctionComponent, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { ThemeProvider } from 'styled-components';
import { MDXProvider } from '@mdx-js/react';

import { MDXComponents } from 'lib/mdx';
import { GlobalStyles } from 'lib/global-styles';
import * as themes from 'lib/themes';
import { ThemeType } from 'lib/themes';

import Header from 'components/layout/Header';
import Container from 'components/layout/Container';
import Footer from 'components/layout/Footer';
import CookieConsent from 'components/layout/CookieConsent';

const initializeTheme = (): ThemeType => (Cookies.get('theme') as ThemeType) || ThemeType.Light;

const Layout: FunctionComponent<{ hasStage: boolean; }> = ({ children, hasStage }) => {
	const [themeName, setThemeName] = useState<ThemeType>(initializeTheme);

	useEffect(() => {
		Cookies.set('theme', themeName, { sameSite: 'lax' });
	}, [themeName]);

	const toggleTheme = () => {
		// @ts-ignore
		const html = document.querySelector('html') as HTMLHtmlElement;

		html.classList.add('theme-transition');

		if (themeName === ThemeType.Light) setThemeName(ThemeType.Dark);
		else setThemeName(ThemeType.Light);

		setTimeout(() => {
			html.classList.remove('theme-transition');
		}, 250);
	};

	const theme = themes[themeName];

	return (
		<ThemeProvider theme={theme}>
			<MDXProvider components={MDXComponents}>
				<GlobalStyles />
				<div
					css={`
						display: flex;
						flex-direction: column;
						min-height: 100vh;
					`}
				>
					<Header toggleTheme={toggleTheme} openSearch={() => {}} />
					<Container
						as="main"
						style={{
							paddingTop: hasStage ? '0' : '',
							flex: '1 0 0'
						}}
					>
						{children}
					</Container>
					<Footer />
				</div>
				<CookieConsent />
			</MDXProvider>
		</ThemeProvider>
	);
};

export default Layout;
