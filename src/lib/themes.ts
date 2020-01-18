import { DefaultTheme } from 'styled-components';

import { colors } from 'lib/colors';
import { darken, transparentize } from 'lib/polished';

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
			rounded: 4
		}
	},
	animation: {
		duration: {
			fast: 0.25
		}
	},
	typography: {}
};

export const light: DefaultTheme = {
	...shared,
	colors: {
		foreground: colors.black,
		background: colors.white,
		highlight: colors.pink,
		highlightDark: darken(0.075, colors.pink),
		highlightLight: transparentize(0.75, colors.pink),
		muted: colors.gray
	}
};

export const dark: DefaultTheme = {
	...shared,
	colors: {
		foreground: colors.white,
		background: colors.black,
		highlight: colors.pink,
		highlightDark: darken(0.075, colors.pink),
		highlightLight: transparentize(0.75, colors.pink),
		muted: colors.gray
	}
};
