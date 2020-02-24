import { graphql } from 'gatsby';

export const DocumentMeta = graphql`
	fragment DocumentMeta on PRISMIC_Meta {
		uid
		id
		lang
		type
		firstPublicationDate
		lastPublicationDate
		alternateLanguages {
			id
			uid
			lang
			type
		}
	}
`;
