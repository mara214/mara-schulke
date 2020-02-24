import React, { FunctionComponent, useEffect } from 'react';
import styled from 'styled-components';
import { linearGradient } from 'lib/polished';

/**
 * 
 * 	display: flex;
	align-items: center;
 */

const RawOverlay: FunctionComponent<{ className?: string }> = ({ className, children }) => {
	useEffect(() => {
		document.body.style.height = '100vh';
		document.body.style.overflowY = 'hidden';

		return () => {
			document.body.style.height = '';
			document.body.style.overflowY = '';
		};
	}, []);

	return <div className={className}>{children}</div>;
};

const Overlay = styled(RawOverlay)`
	position: fixed;
	z-index: ${props => props.theme.layers.overlay.background};
	width: 100vw;
	height: 100vh;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: ${props => linearGradient(props.theme.colors.highlightGradient)};
	color: ${props => props.theme.colors.highlightForeground};
`;

export default Overlay;
