import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

import Particles from 'components/core/Particles';
import Container, { Unaligned } from 'components/layout/Container';

import { rem } from 'lib/polished';
import { mobile, landscape } from 'lib/media';

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
			{ particles && <Particles amount={2} interactive /> }
		</Unaligned>
	)
}

export default styled(Stage)<StageProps>`
	position: relative;
	display: flex;
	align-items: center;
	min-height: ${props => rem(2 * props.theme.spacings.xlarge)};
	padding: ${props => rem(props.theme.spacings.large)} 0;

	&::before {
		display: block;
		content: '';
		position: absolute;
		left: 0;
		top: -100%;
		height: 100%;
		width: 100%;
	}

	${Container} {
		height: 100%;
		display: flex;
		align-items: center;

		h1 {
			margin: 0;
			border: 0;
			padding: 0;
			font-size: 400%;

			${landscape} {
				font-size: 300%;
			}

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

		${mobile} {
			margin-top: ${props => rem(props.theme.spacings.medium)};
		}
	}

	${landscape} {
		min-height: ${props => rem(2 * props.theme.spacings.xlarge)};
	}
`;
