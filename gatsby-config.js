require('dotenv').config();

module.exports = {
	plugins: [
		{
			resolve: `gatsby-plugin-alias-imports`,
			options: {
				alias: {
					components: './src/components',
					fonts: './src/fonts',
					lib: './src/lib',
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
				path: '/preview',
				previews: true
			}
		}
	]
};
