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
			highlightDark: string;
			highlightLight: string;

			muted: string;
		};
		spacings: {
			large: number;
			medium: number;
			small: number;
		};
		border: {
			radius: {
				rounded: number;
			};
		};
		animation: {
			duration: {
				fast: number;
			};
		};
		typography: {};
	}

	export type Theme = DefaultTheme;
}
