import { createGlobalStyle, GlobalStyleComponent, DefaultTheme } from 'styled-components';

import typography from 'lib/typography';
import fonts from 'lib/fonts';
import { normalize, rem } from 'lib/polished';

export const GlobalStyles: GlobalStyleComponent<{}, DefaultTheme> = createGlobalStyle`
	${fonts}
	${normalize()}
	${typography.toString()}
	
	* {
		color: ${props => props.theme.colors.foreground};
		text-align: left;
		word-wrap: break-word;
		font-kerning: normal;

		::selection {
			background-color: ${props => props.theme.colors.highlight};
			color: ${props => props.theme.colors.highlightForeground};
		}
	}

	html {
		background-color: ${props => props.theme.colors.background};
		min-width: 100vw;
		max-width: 100vw;
		overflow-x: hidden;
		
		&.theme-transition * {
			transition: none !important;
		}
	}

	a {
		color: ${props => props.theme.colors.highlight};
		text-decoration: none;

		h1,h2,h3,h4,h5,h6 {
			color: ${props => props.theme.colors.foreground};
		}
	}

	ul {
		margin-left: 0;
		list-style-position: inside;
	}

	hr {
		margin: ${props => rem(props.theme.spacings.xlarge)} 0px;
		border-color: ${props => props.theme.colors.muted} currentcolor currentcolor;
		border-style: solid none none;
		border-width: 1px medium medium;
		border-image: none 100% / 1 / 0 stretch;
		background: rgba(0, 0, 0, 0) none repeat scroll 0% 0%;
	}

	button {
		border: 0;
		outline: none;
		text-decoration: none;
	}

	pre {
		font-size: 0.85rem;
		padding: ${props => rem(props.theme.spacings.small)};
		overflow: auto;
	}

	.prism-code {
		border-radius: ${props => rem(props.theme.border.radius.rounded)};

		* {
			color: inherit;
		}

		.highlighted-line {
			position: relative;
			left: -${props => rem(props.theme.spacings.small)};
			margin-right: -${props => rem(props.theme.spacings.small * 2)};
			padding-left: ${props => rem(props.theme.spacings.small - 5)};
			border-left: 5px solid rgb(201, 167, 255);
			background-color: rgba(201, 167, 255, 0.2);
		}
	}
`;
