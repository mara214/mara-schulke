import React, {FunctionComponent, useEffect, useState} from 'react';
import Cookies from 'js-cookie';
import {ThemeProvider} from 'styled-components';

import {GlobalStyles} from 'lib/global-styles';
import * as themes from 'lib/themes';
import {ThemeType} from 'lib/themes';

import Header from 'components/layout/Header';
import Footer from 'components/layout/Footer';
import Container from 'components/layout/Container';

const initializeTheme = (): ThemeType => Cookies.get('theme') as ThemeType || ThemeType.Light;

export const Layout: FunctionComponent<{}> = ({ children }) => {
	const [themeName, setThemeName] = useState<ThemeType>(initializeTheme);

	useEffect(() => {
		Cookies.set('theme', themeName);
	}, [themeName]);

	const toggleTheme = () => {
		if (themeName === ThemeType.Light)
			return setThemeName(ThemeType.Dark);
		else
			return setThemeName(ThemeType.Light);
	};

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
