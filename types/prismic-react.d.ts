declare module 'prismic-reactjs' {
	import { Document } from 'prismic-javascript/d.ts/documents';

	export interface RichTextProps {
		render: object;
		htmlSerializer(
			type: string,
			element: any,
			content: any,
			children: any,
			key: number | string
		): React.Component | React.FunctionComponent | React.ReactNode;
		linkResolver(document: Document): string;
		hrefResolver(document: Document): string;
	}

	export const RichText: React.FunctionComponent<RichTextProps> & {
		asText(): string;
	};
}
