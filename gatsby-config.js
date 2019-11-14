module.exports = {
	plugins: [
		`gatsby-plugin-styled-components`,
		{
			resolve: 'gatsby-source-prismic-graphql',
			options: {
				repositoryName: 'maximilian-schulke',
				accessToken: process.env.PRISMIC_API_KEY
			}
		}
	]
};
