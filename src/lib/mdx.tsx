import React from 'react';
import styled from 'styled-components';

import Code, { CodeProps } from 'components/core/Code';
import { rem } from 'lib/polished';

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
	h1: styled.h2`
		font-size: ${rem(32)};
		padding-bottom: calc(0.4rem - 1px);
		margin-top: 2.5rem;
		margin-bottom: ${rem(20)};
		border-bottom: 1px solid hsla(0,0%,0%,0.07);
	`,
	pre: (originalProps: any) => {

		const props: CodeProps | null = prePropsToCodeProps(originalProps)

		if (props) {
			return <Code {...props} />
		}

		return <pre {...originalProps} />
	},
};