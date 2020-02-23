import React, { FunctionComponent, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { ThemeProvider } from 'styled-components';

import { GlobalStyles } from 'lib/global-styles';
import * as themes from 'lib/themes';
import { ThemeType } from 'lib/themes';

import Header from 'components/layout/Header';
import Container from 'components/layout/Container';
import CookieConsent from 'components/layout/CookieConsent';
import Footer from 'components/layout/Footer';

const initializeTheme = (): ThemeType => (Cookies.get('theme') as ThemeType) || ThemeType.Light;

export const Layout: FunctionComponent<{ location: any }> = ({ children, location }) => {
	const [themeName, setThemeName] = useState<ThemeType>(initializeTheme);

	useEffect(() => {
		Cookies.set('theme', themeName);
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
			<GlobalStyles />
			<Header toggleTheme={toggleTheme} location={location} />
			<Container>{children}</Container>
			<Footer />
			<CookieConsent />
		</ThemeProvider>
	);
};
