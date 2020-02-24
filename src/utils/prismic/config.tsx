import { Document } from 'prismic-javascript/d.ts/documents';

export const href = (doc: Document): string => {
	console.log(`tried to resolve a href - ${JSON.stringify(doc, null, 4)}`);

	switch (doc.type) {
		case 'blog-post':
			return `/post/${doc.uid}`;

		case 'page':
			return `/${doc.uid}`;

		default:
			return '/404';
	}
};

export const link = (doc: Document): string => {
	console.log(`tried to resolve a link - ${JSON.stringify(doc, null, 4)}`);
	return href(doc);
};
