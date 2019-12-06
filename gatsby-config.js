require('dotenv').config();

module.exports = {
	siteMetadata: {
		title: `Maximilian Schulke`,
		description: `A place where i post about nerd stuff with a lot of technical details.`,
		author: `@schulke-214`
	},
	plugins: [
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `static`,
				path: `${__dirname}/static`
			}
		},
		{
			resolve: `gatsby-plugin-alias-imports`,
			options: {
				alias: {
					components: './src/components',
					fonts: './src/fonts',
					lib: './src/lib',
					utils: './src/utils',
					layouts: './src/layouts',
					pages: './src/pages',
					templates: './src/templates'
				}
			}
		},
		'gatsby-plugin-styled-components',
		`gatsby-plugin-typescript`,
		{
			resolve: 'gatsby-source-prismic-graphql',
			options: {
				repositoryName: 'maximilian-schulke',
				accessToken: process.env.PRISMIC_API_KEY,
				defaultLang: 'en-us',
				previews: false,
				pages: [
					{
						type: 'BlogPost',
						match: '/post/:uid',
						path: '/post',
						component: require.resolve('./src/templates/blog-post.tsx')
					}
				]
			}
		},
		{
			resolve: `gatsby-plugin-manifest`,
			options: {
				name: `My Blog`,
				short_name: `My Blog`,
				start_url: `/`,
				background_color: `#000000`,
				theme_color: `#ffffff`,
				display: `standalone`,
				icon: `static/assets/icon.png`
			}
		},
		`gatsby-plugin-offline`,
		`gatsby-plugin-react-helmet`
	]
};
