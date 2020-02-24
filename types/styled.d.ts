import 'styled-components';
import { LinearGradientConfiguration } from 'polished/lib/types/linearGradientConfiguration';
import { PrismTheme } from 'prism-react-renderer';

declare module 'styled-components' {
	interface LayerConfiguration {
		foreground: number;
		content: number;
		background: number;
	}

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

			state: {
				muted: string;
				success: string;
				info: string;
				error: string;
			};
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
		layers: {
			overlay: LayerConfiguration;
			popup: LayerConfiguration;
			default: LayerConfiguration;
		};
		_id: string;
	}

	export type Theme = DefaultTheme;
}
