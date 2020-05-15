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
						title
						description
						previewImage
						twitterAuthor
						liveUrl
						author
					}
				}
			}
		`
	);

	const descr: string = description || site.siteMetadata.description;
	const previewImage: string = image || site.siteMetadata.previewImage;

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
					property: `og:site_name`,
					content: site.siteMetadata.title
				},
				{
					property: `og:url`,
					content: site.siteMetadata.liveUrl
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
					content: image
				},
				{
					name: `twitter:creator`,
					content: site.siteMetadata.twitter
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
				{

				},
				...meta
			]}
		/>
	);
};

export default SEO;
