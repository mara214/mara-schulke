import React, { FunctionComponent, useEffect } from 'react';
import styled from 'styled-components';
import { rem } from 'lib/polished';


const RawOverlay: FunctionComponent<{ className?: string }> = ({ className, children }) => {
	useEffect(() => {
		const top = window.scrollY;
		document.body.style.height = '100vh';
		document.body.style.overflowY = 'hidden';

		return () => {
			document.body.style.height = '';
			document.body.style.overflowY = '';
			window.scrollTo({ top });
		};
	}, []);

	return <div className={className}>{children}</div>;
};

const Overlay = styled(RawOverlay)`
	display: flex;
	flex-direction: column;
	position: fixed;
	z-index: ${props => props.theme.layers.overlay.background};
	padding: ${props => rem(props.theme.spacings.large * 2)} ${props => rem(props.theme.spacings.large)};
	width: 100vw;
	height: 100vh;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: ${props => props.theme.colors.navigationBackground};
	color: ${props => props.theme.colors.navigationForeground};
`;

export default Overlay;
