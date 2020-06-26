import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

import Particles from 'components/core/Particles';
import Container, { Unaligned } from 'components/layout/Container';

import { rem } from 'lib/polished';
import { mobile } from 'lib/media';

interface StageProps {
	className?: string;
	particles?: boolean;
	title: string;
}

const Stage: FunctionComponent<StageProps> = ({ className, particles, title }) => {
	return (
		<Unaligned className={className}>
			<Container slim css={`pointer-events: none;`}>
				<h1>{title}</h1>
			</Container>
			{ particles && <Particles amount={12} interactive /> }
		</Unaligned>
	)
}

export default styled(Stage)<StageProps>`
	position: relative;
	height: ${props => rem(5 * props.theme.spacings.xlarge)};
	background-color: ${props => props.theme.colors.navigationBackground};

	&::before {
		display: block;
		content: '';
		position: absolute;
		left: 0;
		top: -100%;
		height: 100%;
		width: 100%;
		background-color: ${props => props.theme.colors.navigationBackground};
	}

	${Container} {
		color: ${props => props.theme.colors.navigationForeground};
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;

		h1 {
			margin: 0;
			border: 0;
			padding: 0;
			font-size: 400%;

			${mobile} {
				font-size: 200%;
			}
		}
	}

	${Particles} {
		overflow: hidden;
	}

	+ * {
		margin-top: ${props => rem(props.theme.spacings.large)};
	}
`;