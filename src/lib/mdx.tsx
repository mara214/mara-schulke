import React from 'react';

import Code, { CodeProps } from 'components/core/Code';

const prePropsToCodeProps = (props: any): (React.ComponentProps<'pre'> & CodeProps) | null => {
	if (!props.children || !props.children.props || props.children.props.mdxType !== 'code')
		return null;

	const className: string = props.children.props.className || '';
	const match: RegExpMatchArray | null = className.match(/language-([\0-\uFFFF]*)/);

	return {
		language: match ? match[1] : '',
		code: props.children.props.children.trim(),
		className,
		...props.children.props
	}
};

export const MDXComponents = {
	pre: (originalProps: any) => {

		const props: CodeProps | null = prePropsToCodeProps(originalProps)

		if (props) {
			return <Code {...props} />
		}

		return <pre {...originalProps} />
	},
};