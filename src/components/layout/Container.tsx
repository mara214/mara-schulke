import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';

import { mobile } from 'lib/media';

interface ContainerProps {
	slim?: boolean;
	flex?: boolean;
}

export default styled.div<ContainerProps>`
	display: ${props => (props.flex ? 'flex' : 'block')};
	width: 100%;
	margin: 0 auto;
	max-width: ${props => rem(props.theme.layout.maxWidth)};
	padding: ${props => (props.slim ? `0 ${rem(props.theme.spacings.large)}` : rem(props.theme.spacings.large))};

	${mobile} {
		padding: ${props => (props.slim ? `0 ${rem(props.theme.spacings.medium)}` : rem(props.theme.spacings.medium))};
	}
`;
