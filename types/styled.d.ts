import 'styled-components';
import {colors} from "lib/colors";

declare module 'styled-components' {
	export interface DefaultTheme {
		layout: {
			maxWidth: number;
		};
		colors: {
			foreground: string;
			background: string;

			highlight: string;
			highlightForeground: string,
			highlightDark: string;
			highlightLight: string;

			muted: string;
		};
		spacings: {
			xlarge: number;
			large: number;
			medium: number;
			small: number;
			xsmall: number;
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
