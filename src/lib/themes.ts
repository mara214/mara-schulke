import { DefaultTheme } from 'styled-components';

import { colors } from 'lib/colors';
import { darken, transparentize } from 'polished';

export const light: DefaultTheme = {
	layout: {
		maxWidth: 800
	},
	colors: {
		foreground: colors.black,
		background: colors.white,
		highlight: colors.darkred,
		highlightDark: darken(0.075, colors.darkred),
		highlightLight: transparentize(0.75, colors.darkred),
		muted: colors.gray
	},
	spacings: {
		large: 40,
		medium: 20,
		small: 10
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
