const { registerLinkResolver } = require('gatsby-source-prismic-graphql');
const { link } = require('utils/prismic/config');

registerLinkResolver(link);
