import { DefaultTheme } from 'styled-components';
import { Dark as DarkTheme } from 'lib/syntax';
import { Light as LightTheme } from 'lib/syntax';

import { colors } from 'lib/colors';
import { lighten, darken, transparentize } from 'lib/polished';
import { LinearGradientConfiguration } from 'polished/lib/types/linearGradientConfiguration';

DarkTheme.plain.backgroundColor = 'rgb(20, 20, 20)';
LightTheme.plain.backgroundColor = 'rgb(248, 249, 250)';

const shared = {
	layout: {
		maxWidth: 880
	},
	spacings: {
		xlarge: 60,
		large: 40,
		medium: 20,
		small: 10,
		xsmall: 5
	},
	border: {
		radius: {
			rounded: 3
		}
	},
	animation: {
		duration: {
			instant: 0.1,
			fast: 0.25
		}
	},
	layers: {
		overlay: {
			foreground: 105,
			content: 100,
			background: 95
		},
		popup: {
			foreground: 55,
			content: 50,
			background: 45
		},
		default: {
			foreground: 5,
			content: 0,
			background: -5
		}
	}
};

const BLACK: string = colors.black;
const WHITE: string = colors.white;
const HIGHLIGHT: string = colors.terraCotta;
const HIGHLIGHT_GRADIENT: LinearGradientConfiguration = {
	colorStops: [colors.terraCotta, colors.terraCotta],
	toDirection: '-213deg'
};

export const light: DefaultTheme = {
	...shared,
	colors: {
		foreground: BLACK,
		background: WHITE,
		highlight: HIGHLIGHT,
		highlightForeground: WHITE,
		highlightDark: darken(0.075, HIGHLIGHT),
		highlightLight: transparentize(0.75, HIGHLIGHT),
		highlightGradient: HIGHLIGHT_GRADIENT,
		muted: darken(0.05, WHITE)
	},
	code: {
		syntax: LightTheme,
		highlight: {
			border: HIGHLIGHT,
			background: transparentize(0.75, HIGHLIGHT)
		}
	},
	_id: 'light'
};

export const dark: DefaultTheme = {
	...shared,
	colors: {
		foreground: WHITE,
		background: BLACK,
		highlight: HIGHLIGHT,
		highlightForeground: WHITE,
		highlightDark: darken(0.075, HIGHLIGHT),
		highlightLight: transparentize(0.75, HIGHLIGHT),
		highlightGradient: HIGHLIGHT_GRADIENT,
		muted: lighten(0.1, BLACK)
	},
	code: {
		syntax: DarkTheme,
		highlight: {
			border: HIGHLIGHT,
			background: transparentize(0.75, HIGHLIGHT)
		}
	},
	_id: 'dark'
};

export enum ThemeType {
	Light = 'light',
	Dark = 'dark'
}
