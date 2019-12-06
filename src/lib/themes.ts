import { DefaultTheme } from 'styled-components';

import { colors } from 'lib/colors';
import { darken, transparentize } from 'lib/polished';

export const light: DefaultTheme = {
	layout: {
		maxWidth: 880
	},
	colors: {
		foreground: colors.black,
		background: colors.white,
		highlight: colors.green,
		highlightDark: darken(0.075, colors.green),
		highlightLight: transparentize(0.75, colors.green),
		muted: colors.gray
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
