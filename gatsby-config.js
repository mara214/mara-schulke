require('dotenv').config();
const path = require('path');

const CONTENT_DIR = path.join(__dirname, 'content');


const dev = [
	{
		resolve: 'gatsby-plugin-alias-imports',
		options: {
			alias: {
				components: './src/components',
				fonts: './src/fonts',
				lib: './src/lib',
				utils: './src/utils',
				layouts: './src/layouts',
				pages: './src/pages',
				templates: './src/templates',
			},
		},
	},
	'gatsby-plugin-styled-components',
	'gatsby-plugin-typescript',
];

const sources = [
	{
		resolve: 'gatsby-source-filesystem',
		options: {
			name: 'static',
			path: path.join(__dirname, 'static'),
		},
	},
	{
		resolve: 'gatsby-source-filesystem',
		options: {
			name: 'articles',
			path: path.join(CONTENT_DIR, 'articles'),
		},
	},
	{
		resolve: 'gatsby-source-filesystem',
		options: {
			name: 'pages',
			path: path.join(CONTENT_DIR, 'pages'),
		},
	},
	'gatsby-transformer-sharp',
	'gatsby-plugin-sharp',
	{
		resolve: 'gatsby-plugin-mdx',
		options: {
			extensions: ['.mdx', '.md'],
			gatsbyRemarkPlugins: [
				{
					resolve: 'gatsby-remark-images',
					options: {
						maxWidth: 960,
						quality: 90,
						linkImagesToOriginal: false,
					},
				},
			],
			plugins: [
				{
					resolve: 'gatsby-remark-images',
					options: {
						maxWidth: 960,
						quality: 90,
						linkImagesToOriginal: false,
					},
				},
			],
		},
	},
];

const seo = [
	{
		resolve: 'gatsby-plugin-manifest',
		options: {
			name: 'Maximilian Schulke',
			short_name: 'Maximilian Schulke',
			start_url: '/',
			background_color: '#000000',
			theme_color: '#ffffff',
			display: 'standalone',
			icon: 'static/assets/favicon.png',
		},
	},
	'gatsby-plugin-offline',
	'gatsby-plugin-react-helmet',
];

module.exports = {
	siteMetadata: {
		title: 'Maximilian Schulke',
		description: 'A place where i post about nerd stuff with a lot of technical details.',
		author: '@schulke-214',
	},
	plugins: [
		...dev,
		...sources,
		...seo
	],
};
