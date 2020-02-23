import 'styled-components';
import { LinearGradientConfiguration } from 'polished/lib/types/linearGradientConfiguration';
import { PrismTheme } from 'prism-react-renderer';

declare module 'styled-components' {
	export interface DefaultTheme {
		layout: {
			maxWidth: number;
		};
		colors: {
			foreground: string;
			background: string;

			highlight: string;
			highlightForeground: string;
			highlightDark: string;
			highlightLight: string;
			highlightGradient: LinearGradientConfiguration;

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
				instant: number;
				fast: number;
			};
		};
		code: {
			syntax: PrismTheme;
			highlight: {
				border: string;
				background: string;
			};
		};
		_id: string;
	}

	export type Theme = DefaultTheme;
}
