import { createGlobalStyle, GlobalStyleComponent, DefaultTheme } from 'styled-components';
import { normalize } from 'polished';

import typography from 'lib/typography';
import 'fonts/fonts.css';

export const GlobalStyles: GlobalStyleComponent<{}, DefaultTheme> = createGlobalStyle`
	${typography.toString()}
	${normalize()}
	* {
		color: ${props => props.theme.colors.foreground};
	}

	html {
		background-color: ${props => props.theme.colors.background};
	}

	a {
		color: ${props => props.theme.colors.highlight};
		text-decoration: none;
	}
`;
