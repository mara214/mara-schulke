import React, { FunctionComponent } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { Helmet } from 'react-helmet';

type SEOMetaElement = React.DetailedHTMLProps<React.MetaHTMLAttributes<HTMLMetaElement>, HTMLMetaElement>[];

export interface SEOProps {
	description?: string;
	image?: string;
	lang?: string;
	meta?: SEOMetaElement;
	title: string;
}

const SEO: FunctionComponent<SEOProps> = ({ description = '', image = '', lang = 'en', meta = [], title = '' }) => {
	const { site } = useStaticQuery<{ site: any }>(
		graphql`
			query SiteMetaData {
				site {
					siteMetadata {
						seo {
							title
							description
							previewImage
							twitter
							url
							author
						}
					}
				}
			}
		`
	);

	const { seo } = site.siteMetadata;

	const descr: string = description || seo.description;
	const preview: string = image || seo.previewImage;

	return (
		<Helmet
			htmlAttributes={{ lang }}
			title={title}
			titleTemplate={`${seo.title} – %s`}
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
					property: `og:site_name`,
					content: seo.title
				},
				{
					property: `og:url`,
					content: seo.url
				},
				{
					property: `og:image`,
					content: image
				},
				{
					name: `twitter:card`,
					content: `summary`
				},
				{
					name: `twitter:image`,
					content: preview
				},
				{
					name: `twitter:creator`,
					content: seo.twitter
				},
				{
					name: `twitter:title`,
					content: title
				},
				{
					name: `twitter:description`,
					content: descr
				},
				{
					httpEquiv: 'Content-Type',
					content: 'text/html; charset=utf-8'
				},
				...meta
			]}
		/>
	);
};

export default SEO;
