import React, { FunctionComponent } from 'react';
import ReactLatex from 'react-latex';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import { rem } from 'polished';

export interface LatexProps {
	className: string
}

const Latex: FunctionComponent<LatexProps> = ({ className, children, ...props }) => {
	return (
		<div className={className}>
			<Helmet>
				<link
					rel="stylesheet"
					href="https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.css"
					integrity="sha384-qCEsSYDSH0x5I45nNW4oXemORUZnYFtPy/FqB/OjqxabTMW5HVaaH9USK4fN3goV"
					crossOrigin="anonymous"
				/>
			</Helmet>
			<ReactLatex {...props}>{children}</ReactLatex>
		</div>
	);
};

export default styled(Latex)`
	display: flex;
	padding: ${props => rem(props.theme.spacings.small)};
	overflow: auto;
	border-radius: ${props => rem(props.theme.border.radius.rounded)};
	border-left: 5px solid ${props => props.theme.latex.border};
	background-color: ${props => props.theme.latex.background};
	white-space: nowrap;

	* {
		color: inherit;
	}

	&::after {
		content: '';
		display: block;
		height: 1px;
		width: ${props => rem(props.theme.spacings.small)};
		flex-shrink: 0;
	}
`;
