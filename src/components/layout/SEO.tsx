import React, { FunctionComponent } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { Helmet } from 'react-helmet';

type SEOMetaElement = React.DetailedHTMLProps<React.MetaHTMLAttributes<HTMLMetaElement>, HTMLMetaElement>[];

export interface SEOProps {
	description?: string;
	lang?: string;
	meta?: SEOMetaElement;
	title: string;
}

const SEO: FunctionComponent<SEOProps> = ({ description = '', lang = 'en', meta = [], title = '' }) => {
	const { site } = useStaticQuery<{ site: any }>(
		graphql`
			query SiteMetaData {
				site {
					siteMetadata {
						title
						description
						author
					}
				}
			}
		`
	);

	const descr: string = description || site.siteMetadata.description;

	return (
		<Helmet
			htmlAttributes={{ lang }}
			title={title}
			titleTemplate={`${site.siteMetadata.title} – %s`}
			meta={[
				{
					name: `description`,
					content: descr
				},
				{
					property: `og:title`,
					content: title
				},
				{
					property: `og:description`,
					content: descr
				},
				{
					property: `og:type`,
					content: `website`
				},
				{
					name: `twitter:card`,
					content: `summary`
				},
				{
					name: `twitter:creator`,
					content: site.siteMetadata.author
				},
				{
					name: `twitter:title`,
					content: title
				},
				{
					name: `twitter:description`,
					content: descr
				},
				...meta
			]}
		/>
	);
};

export default SEO;
