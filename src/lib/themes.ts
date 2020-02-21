import { DefaultTheme } from 'styled-components';
import DarkTheme from 'prism-react-renderer/themes/nightOwl';
import LightTheme from 'prism-react-renderer/themes/nightOwlLight';

import { colors } from 'lib/colors';
import { lighten, darken, transparentize } from 'lib/polished';
import { LinearGradientConfiguration } from 'polished/lib/types/linearGradientConfiguration';

DarkTheme.plain.backgroundColor = 'rgb(25, 26, 27)';
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
	}
};

const BLACK: string = colors.black;
const WHITE: string = colors.white;
const HIGHLIGHT: string = colors.orange;
const HIGHLIGHT_GRADIENT: LinearGradientConfiguration = {
	colorStops: [colors.orange, colors.orange],
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
		muted: lighten(0.05, BLACK)
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
