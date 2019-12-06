import React, { FunctionComponent } from 'react';
import { ThemeProvider } from 'styled-components';

import { GlobalStyles } from 'lib/global-styles';
import { light } from 'lib/themes';

import Header from 'components/layout/Header';
import Footer from 'components/layout/Footer';
import Container from 'components/layout/Container';

export const Layout: FunctionComponent<{}> = ({ children }) => (
	<ThemeProvider theme={light}>
		<GlobalStyles />
		<Header />
		<Container>{children}</Container>
		<Footer />
	</ThemeProvider>
);
