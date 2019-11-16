import React, { FunctionComponent } from 'react';
import { ThemeProvider } from 'styled-components';

import { GlobalStyles } from 'lib/global-styles';
import { light } from 'lib/themes';

import Container from 'components/layout/Container';

export const Layout: FunctionComponent<{}> = ({ children }) => (
	<ThemeProvider theme={light}>
		<Container maxWidth={800}>
			<GlobalStyles />
			{children}
		</Container>
	</ThemeProvider>
);
