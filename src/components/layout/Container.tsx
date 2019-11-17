import React from 'react';
import styled, { css } from 'styled-components';
import { rem } from 'polished';

import { mobile } from 'lib/media';

interface ContainerProps {
	slim?: boolean;
}

export default styled.div<ContainerProps>`
	width: 100%;
	margin: 0 auto;
	max-width: ${props => rem(props.theme.layout.maxWidth)};
	padding: ${props => (props.slim ? `0 ${rem(props.theme.spacings.large)}` : rem(props.theme.spacings.large))};

	${mobile} {
		padding: ${props => (props.slim ? `0 ${rem(props.theme.spacings.medium)}` : rem(props.theme.spacings.medium))};
	}
`;
