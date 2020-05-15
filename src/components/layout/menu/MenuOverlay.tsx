import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

import Overlay from 'components/ui/Overlay';

interface MenuOverlayProps {
	className?: string;
}

const MenuOverlayContent = styled.div`
	height: min-content;
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const MenuOverlay: FunctionComponent<MenuOverlayProps> = ({ className, children }) => (
	<Overlay className={className}>
		<MenuOverlayContent>{children}</MenuOverlayContent>
	</Overlay>
);

export default MenuOverlay;
