import React from 'react';
import { link, href } from './config';

const clickHandler = (href: string, as: string) => (e: any) => {
	e.preventDefault();
	// Router.push(href, as);
	// todo(max): use gatsby router
};

type Transformer = {
	[key: string]: (element: any, content: any, children: any, key: number | string) => React.ReactChild;
};

const tranform: Transformer = {
	hyperlink: (element, content, children, key) => {
		if (element.data.link_type === 'Document') {
			const props = {
				onClick: clickHandler(href(element.data), link(element.data)),
				href: link(element.data),
				key
			};

			return <a {...props}>{children}</a>;
		}

		const target = element.data.target ? element.data.target : '_blank';
		const rel = element.data.target ? 'noopener' : '';

		const props = {
			href: element.data.url || link(element.data),
			target,
			rel,
			key
		};

		return <a {...props}>{children}</a>;
	},
	image: (element, content, children, key) => {
		const props: any = {
			className: ['mobile-fullscreen-image', element.label || ''].join(' ').trim(),
			key
		};

		let internal = false;

		// internal link
		if (element.linkTo && element.linkTo.link_type === 'Document') {
			internal = true;

			props.onClick = clickHandler(href(element.linkTo), link(element.linkTo));
			props.href = link(element.linkTo);
		}

		// handle images just like regular HTML Serializer
		const linkProps: any = {
			url: element.linkTo ? element.linkTo.url || link(element.linkTo) : null,
			target: element.linkTo && element.linkTo.target ? element.linkTo.target : null,
			rel: element.linkTo && element.linkTo.target ? 'noopener' : null
		};

		const img = <img src={element.url} alt={element.alt || ''} />;

		const childs = () => {
			if (linkProps.url) {
				if (internal) {
					<a {...props}>{img}</a>;
				}

				return <a {...props} {...linkProps}></a>;
			}

			return img;
		};

		return <p {...props}>{childs()}</p>;
	}
};

export const HTMLserializer = (
	type: string,
	element: any,
	content: any,
	children: any,
	key: number | string
): React.ReactChild | null => {
	if (tranform[type]) return tranform[type](element, content, children, key);

	return null;
};
