import React, { FunctionComponent } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { Helmet } from 'react-helmet';

type SEOMetaElement = React.DetailedHTMLProps<React.MetaHTMLAttributes<HTMLMetaElement>, HTMLMetaElement>[];

export interface SEOProps {
	description?: string;
	keywords?: string[];
	image?: string;
	url?: string;
	meta?: SEOMetaElement;
	type?: string;
	title: string;
}

const SEO: FunctionComponent<SEOProps> = ({
	description = '',
	keywords = null,
	image = '',
	meta = [],
	title = '',
	type = 'website',
	url = ''
}) => {
	const { site } = useStaticQuery<{ site: any }>(
		graphql`
			query SiteMetaData {
				site {
					siteMetadata {
						locale
						seo {
							title
							description
							previewImage
							twitter
							url
							author
							keywords
						}
					}
				}
			}
		`
	);

	const { seo, locale } = site.siteMetadata;

	const lang: string = locale.substring(0, 2);
	const descr: string = description ?? seo.description;
	const kwords: string[] = keywords ?? seo.keywords;
	const preview: string = image ?? seo.previewImage;

	return (
		<Helmet
			htmlAttributes={{ lang }}
			title={title}
			titleTemplate={`${seo.title} – %s`}
			meta={[
				{
					name: `robots`,
					content: `index, follow`
				},
				{
					name: `description`,
					content: descr
				},
				{
					name: `keywords`,
					content: kwords.join(', ')
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
					content: type
				},
				{
					property: `og:site_name`,
					content: seo.title
				},
				{
					property: `og:url`,
					content: url
				},
				{
					property: `og:image`,
					content: image
				},
				{
					property: `og:locale`,
					content: locale
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
