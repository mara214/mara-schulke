import React from 'react';
import styled from 'styled-components';
import { rem } from 'lib/polished';

import { mobile, landscape } from 'lib/media';

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

	> h1:first-child {
		margin-top: 0;
	}

	.mobile-fullscreen-image img {
		display: block;
		margin: 0 auto;
	}

	${landscape} {
		.mobile-fullscreen-image {
			margin-left: ${props => rem(-props.theme.spacings.large)};
			margin-right: ${props => rem(-props.theme.spacings.large)};
		}

		.mobile-fullscreen-image img {
			width: 100%;
		}
	}

	${mobile} {
		padding: ${props => (props.slim ? `0 ${rem(props.theme.spacings.medium)}` : rem(props.theme.spacings.medium))};

		.mobile-fullscreen-image {
			margin-left: ${props => rem(-props.theme.spacings.medium)};
			margin-right: ${props => rem(-props.theme.spacings.medium)};
			width: 100vw;
		}
	}
`;
