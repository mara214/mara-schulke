import { createGlobalStyle, GlobalStyleComponent, DefaultTheme } from 'styled-components';

import typography from 'lib/typography';
import { normalize, rem, darken, transparentize } from 'lib/polished';
import { mobile } from 'lib/media';

export const GlobalStyles: GlobalStyleComponent<{}, DefaultTheme> = createGlobalStyle`
	${normalize()}
	${typography.toString()}
	
	* {
		color: ${props => props.theme.colors.foreground};
		text-align: left;
		word-wrap: break-word;
		font-kerning: normal;
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

	blockquote {
		border-color: ${props => props.theme.colors.state.muted};
		padding-left: ${props => rem(props.theme.spacings.medium)};
	}

	p code {
		position: relative;
		top: -2px;
		padding: ${props => rem(props.theme.spacings.xsmall)};
		line-height: 1.5;
		background-color: ${props => props.theme.colors.state.muted};
	}

	a {
		color: ${props => props.theme.colors.foreground};
		text-decoration: none;
	}

	p a {
		text-decoration: underline;
	}

	ul {
		margin-left: 0;
		list-style-position: inside;
	}

	pre, hr, code, .code {
		font-family: 'Roboto Mono', monospace;
	}

	hr {
		overflow: hidden;
		white-space: nowrap;
		font-size: 0.85rem;
		height: auto;
		color: ${props => props.theme.hr.color} !important;
		background-color: transparent;
		margin: ${props => rem(props.theme.spacings.medium)} 0px;

		${mobile} {
			margin: ${props => rem(props.theme.spacings.small)} 0px;
		}

		&::before {
			content: '//';
		}

		&::after {
			content: '________________________________________________________________________________________________________________________________';
		}
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
			border-left: 5px solid ${props => props.theme.code.highlight.border};
			background-color: ${props => props.theme.code.highlight.background};
		}
	}
`;
