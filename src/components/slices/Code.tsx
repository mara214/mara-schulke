import React, { FunctionComponent, useState, useContext } from 'react';
import Highlight, { Language } from 'prism-react-renderer';
import { ThemeContext, css } from 'styled-components';
import Prism from 'utils/prism';

import { rem, transparentize } from 'lib/polished';

interface CopyProps {
	text: string;
	className?: string;
}

const Copy: FunctionComponent<CopyProps> = ({ text, className }) => {
	const [copied, setCopied] = useState(false);

	const copyContent = async () => {
		const { clipboard } = navigator;

		if (typeof clipboard !== 'object') return;

		try {
			await clipboard.writeText(text);
			setCopied(true);
			setTimeout(() => setCopied(false), 500);
		} catch {
			setCopied(false);
		}
	};

	return (
		<div
			onClick={copyContent}
			className={className}
			css={`
				width: 1.75rem;
				height: 1.75rem;
				cursor: pointer;
				display: flex;
				justify-content: center;
				align-items: center;

				:hover {
					svg * {
						fill: ${(props: any) => props.theme.colors.foreground};
					}
				}
			`}>
			<svg
				aria-hidden='true'
				focusable='false'
				viewBox='0 0 512 512'
				css={`
					width: 1rem;
				`}>
				<path
					css={`
						fill: ${(props: any) => transparentize(0.75, props.theme.colors.foreground)};

						${copied &&
							css`
								fill: ${props => props.theme.code.highlight.border} !important;
							`}
					`}
					d='M464.867,96.4h-81.4V15c0-8.284-6.716-15-15-15H47.133c-8.284,0-15,6.716-15,15v385.601c0,8.284,6.716,15,15,15h81.4V497 c0,8.284,6.716,15,15,15h321.334c8.284,0,15-6.716,15-15V111.4C479.867,103.116,473.151,96.4,464.867,96.4zM62.133,385.601V30h291.334v81.149c-0.002,0.084-0.013,0.166-0.013,0.251c0,0.085,0.011,0.167,0.013,0.252v273.949H62.133z M449.867,482H158.533v-66.399h209.934c8.284,0,15-6.716,15-15V126.4h66.4V482z'
				/>
			</svg>
		</div>
	);
};

interface CodeSliceProps {
	slice: {
		primary: {
			language: string;
			code: any;
			highlightStart?: number;
			highlightEnd?: number;
		};
	};
}

const CodeSlice: FunctionComponent<CodeSliceProps> = ({ slice }) => {
	const styledTheme = useContext(ThemeContext);

	const isHighlighted = (lineNumber: number) => {
		const { highlightStart: start, highlightEnd: end } = slice.primary;

		if (typeof start !== 'number' || typeof end !== 'number') return false;

		return !!(lineNumber >= start && lineNumber <= end);
	};

	return (
		<div
			css={`
				position: relative;
			`}>
			<Copy
				text={slice.primary.code}
				css={`
					position: absolute;
					top: ${(props: any) => rem(props.theme.spacings.small)};
					right: ${(props: any) => rem(props.theme.spacings.small)};
				`}
			/>
			<Highlight
				Prism={Prism as any}
				code={slice.primary.code}
				language={slice.primary.language as Language}
				theme={styledTheme.code.syntax}>
				{({ className, style, tokens, getLineProps, getTokenProps }) => (
					<pre className={className} style={style}>
						{tokens.map((line: any, i: number) => {
							const lineProps = getLineProps({ line, key: i });
							const classes = [lineProps.className];

							if (isHighlighted(i + 1)) classes.push('highlighted-line');

							return (
								<div {...lineProps} className={classes.join(' ')}>
									<span
										css={`
											display: inline-block;
											width: 2em;
											user-select: none;
											opacity: 0.3;
										`}>
										{i + 1}
									</span>
									{line.map((token: any, key: number) => (
										<span {...getTokenProps({ token, key })} />
									))}
								</div>
							);
						})}
					</pre>
				)}
			</Highlight>
		</div>
	);
};

export default CodeSlice;
