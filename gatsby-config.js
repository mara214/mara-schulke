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
				hooks: './src/hooks',
				layouts: './src/layouts',
				pages: './src/pages',
				templates: './src/templates',
			},
		},
	},
	'gatsby-plugin-styled-components',
	'gatsby-plugin-typescript',
];

const images = [
	{
		resolve: 'gatsby-remark-images',
		options: {
			maxWidth: 960,
			quality: 90,
			linkImagesToOriginal: false,
		}
	}
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
	...images,
	{
		resolve: 'gatsby-plugin-mdx',
		options: {
			extensions: ['.mdx', '.md'],
			gatsbyRemarkPlugins: [...images],
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
	{
		resolve: 'gatsby-plugin-google-analytics',
		options: {
			trackingId: 'UA-165957143-1',
			anonymize: true,
		}
	},
	'gatsby-plugin-offline',
	'gatsby-plugin-react-helmet',
];

module.exports = {
	siteMetadata: {
		title: 'Maximilian Schulke',
		description: 'A place where i post about nerd stuff with a lot of technical details.',
		author: 'Maximilian Schulke',
		twitterAuthor: '@schulke-214',
		liveUrl: 'https://maximilianschulke.com',
		previewImage: '/static/seo-banner.png'
	},
	plugins: [
		...dev,
		...sources,
		...seo
	],
};
