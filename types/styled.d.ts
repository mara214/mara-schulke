import 'styled-components';

declare module 'styled-components' {
	export interface DefaultTheme {
		layout: {
			maxWidth: number;
		};
		colors: {
			foreground: string;
			background: string;
			highlight: string;
		};
		spacings: {
			large: number;
			medium: number;
			small: number;
		};
		typography: {};
	}

	export type Theme = DefaultTheme;
}
