import React from 'react';
import styled from 'styled-components';

import { tablet } from 'lib/media';

interface ContainerProps {
	maxWidth: number;
}

export default styled.div<ContainerProps>`
	width: 100%;
	margin: 0 auto;
	max-width: ${props => props.maxWidth + 80}px;
	padding: 40px;

	${tablet(`
		padding: 20px;
	`)}
`;
