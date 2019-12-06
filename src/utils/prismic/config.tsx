import { Document } from 'prismic-javascript/d.ts/documents';

export const link = (doc: Document): string => {
	console.log(`tried to resolve a link - ${JSON.stringify(doc, null, 4)}`);

	if (doc.type === 'blog-post') {
		return `/post/${doc.uid}`;
	}

	return '/';
};

export const href = (doc: Document): string => {
	console.log(`tried to resolve a href - ${JSON.stringify(doc, null, 4)}`);

	if (doc.type === 'blog-post') {
		return `/post/${doc.uid}`;
	}

	return '/';
};
