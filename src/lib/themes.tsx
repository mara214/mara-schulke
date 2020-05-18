import React from 'react';
import { DefaultTheme } from 'styled-components';
import { Dark as DarkTheme } from 'lib/syntax';
import { Light as LightTheme } from 'lib/syntax';

import { colors } from 'lib/colors';
import { lighten, darken, transparentize } from 'lib/polished';
import { LinearGradientConfiguration } from 'polished/lib/types/linearGradientConfiguration';

DarkTheme.plain.backgroundColor = 'rgb(20, 20, 20)';
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
			fast: 0.25,
			smooth: 0.5
		}
	},
	layers: {
		overlay: {
			foreground: 105,
			content: 100,
			background: 95
		},
		popup: {
			foreground: 55,
			content: 50,
			background: 45
		},
		default: {
			foreground: 5,
			content: 0,
			background: -5
		}
	},
	boxShadow: {
		default: 'rgba(0, 0, 0, 0.15) 0px 5px 40px'
	},
	hr: {
		color: darken(0.5, colors.white)
	},
	particles: {
		colors: [
			'#62d0dd',
			'#ff8e21',
			'#a2d39b',
			'#ceb4ff',
			'#a0b7ff',
			'#ff708b',
		],
		paths: [
			<text><tspan x="14" y="42">0</tspan></text>,
			<text><tspan x="14" y="42">1</tspan></text>,
			// <path d="M19.1,50V0h11.8v50C30.9,50,19.1,50,19.1,50z" />,
			// <path d="M0 10.3h50v11.8H0V10.3zm0 17.6h50v11.8H0V27.9z" />,
			// <path d="M0 45.8l25.8-42L50 46.2z" />,
			// <path d="M25,50c13.8,0,25-11.2,25-25S38.8,0,25,0S0,11.2,0,25S11.2,50,25,50z" />,
			// <path d="M32,25c10.4-3,18-12.6,18-24H37.8c0,7.1-5.7,12.8-12.8,12.8S12.2,8.1,12.2,1H0c0,11.4,7.6,21,18,24 C7.6,28,0,37.6,0,49h12.2c0-7.1,5.7-12.8,12.8-12.8S37.8,41.9,37.8,49H50C50,37.6,42.4,28,32,25z" />,
		]
	}
};

const BLACK: string = colors.black;
const WHITE: string = colors.white;

const HIGHLIGHT: string = colors.orange;
const HIGHLIGHT_GRADIENT: LinearGradientConfiguration = {
	colorStops: [colors.orange, colors.orange],
	toDirection: '-213deg'
};

// states
const SUCCESS: string = colors.green;
const INFO: string = colors.blue;
const ERROR: string = colors.red;

export const light: DefaultTheme = {
	...shared,
	colors: {
		foreground: BLACK,
		background: WHITE,
		navigationForeground: WHITE,
		navigationBackground: BLACK,
		highlight: HIGHLIGHT,
		highlightForeground: WHITE,
		highlightDark: darken(0.075, HIGHLIGHT),
		highlightLight: transparentize(0.75, HIGHLIGHT),
		highlightGradient: HIGHLIGHT_GRADIENT,
		state: {
			success: SUCCESS,
			info: INFO,
			error: ERROR,
			muted: darken(0.075, WHITE)
		}
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
		navigationForeground: WHITE,
		navigationBackground: BLACK,
		highlight: HIGHLIGHT,
		highlightForeground: WHITE,
		highlightDark: darken(0.075, HIGHLIGHT),
		highlightLight: transparentize(0.75, HIGHLIGHT),
		highlightGradient: HIGHLIGHT_GRADIENT,
		state: {
			success: SUCCESS,
			info: INFO,
			error: ERROR,
			muted: lighten(0.075, BLACK)
		}
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
