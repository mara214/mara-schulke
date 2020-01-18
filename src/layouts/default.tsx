import React, { FunctionComponent, useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';

import { GlobalStyles } from 'lib/global-styles';
import * as themes from 'lib/themes';

import Header from 'components/layout/Header';
import Footer from 'components/layout/Footer';
import Container from 'components/layout/Container';

const initializeTheme = () => {
	if (typeof window !== 'undefined') {
		return localStorage.getItem('theme') || 'light';
	}

	return 'light';
};

export const Layout: FunctionComponent<{}> = ({ children }) => {
	const [themeName, setThemeName] = useState(initializeTheme);

	useEffect(() => {
		localStorage.setItem('theme', themeName);
	}, [themeName]);

	const toggleTheme = () => {
		if (themeName === 'light') {
			setThemeName('dark');
			return;
		} else {
			setThemeName('light');
			return;
		}
	};

	// @ts-ignore-next-line
	const theme = themes[themeName];

	return (
		<ThemeProvider theme={theme}>
			<GlobalStyles />
			<Header toggleTheme={toggleTheme} />
			<Container>{children}</Container>
			<Footer />
		</ThemeProvider>
	);
};
