import { DefaultTheme } from 'styled-components';

import { colors } from 'lib/colors';

export const light: DefaultTheme = {
	layout: {
		maxWidth: 800
	},
	colors: {
		foreground: colors.black,
		background: colors.white,
		highlight: colors.pink
	},
	spacings: {
		large: 40,
		medium: 20,
		small: 10
	},
	typography: {}
};
