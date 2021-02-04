import React, { FunctionComponent, useLayoutEffect, useContext } from 'react';
import styled from 'styled-components';

import Layout from 'layouts/default';
import Particles from 'components/core/Particles';


const NotFoundContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
	color: ${props => props.theme.colors.navigationForeground};

	h1 {
		font-size: 750%;

		span  {
			display: block;
			color: inherit;
			font-size: 10%;
			text-align: center;
			font-weight: 300; 
		}
	}

	${Particles} {
		z-index: 1;
	}
`;

interface NotFoundProps {
	data: any;
}

const NotFound: FunctionComponent<NotFoundProps> = () => {
	useLayoutEffect(() => {
		document.body.classList.add('error-not-found');

		return () => document.body.classList.remove('error-not-found');
	}, []);

	return (
		<Layout hasStage={false}>
			<NotFoundContainer>
				<Particles amount={10} interactive />
				<h1>
					404
					<span>Page Not Found</span>
				</h1>
			</NotFoundContainer>
		</Layout>
	);
};

export default NotFound;
