import { createGlobalStyle, GlobalStyleComponent, DefaultTheme } from 'styled-components';
import { normalize } from 'polished';

import typography from 'lib/typography';
import fonts from 'lib/fonts';

export const GlobalStyles: GlobalStyleComponent<{}, DefaultTheme> = createGlobalStyle`
	${fonts}
	${typography.toString()}
	${normalize()}
	
	* {
		color: ${props => props.theme.colors.foreground};
		text-align: left;
		line-height: 1.7;

		::selection {
			background-color: ${props => props.theme.colors.highlight};
			color: ${props => props.theme.colors.background};
		}
	}

	html {
		background-color: ${props => props.theme.colors.background};
	}

	a {
		color: ${props => props.theme.colors.highlight};
		text-decoration: none;
	}

	ul {
		margin-left: 0;
	}
`;
