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

const Layout: FunctionComponent<{ readMode: boolean; }> = ({ children, readMode }) => {
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
			<MDXProvider components={MDXComponents}>
				<GlobalStyles />
				<Header toggleTheme={toggleTheme} openSearch={() => {}} hideOnScroll={readMode} />
				<Container>{children}</Container>
				<Footer />
				<CookieConsent />
			</MDXProvider>
		</ThemeProvider>
	);
};

export default Layout;
