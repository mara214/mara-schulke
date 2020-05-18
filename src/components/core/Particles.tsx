import React, { FunctionComponent, useContext, useState, useLayoutEffect } from 'react';
import styled, { ThemeContext, keyframes } from 'styled-components';
import { mobile } from 'lib/media';

const between = (n: number, m: number) =>  Math.floor(Math.random() * (m - n)) + n;

const moveX = keyframes`
	0%,
	100% {
		transform: translate(0 0);
	}

	50% {
		transform: translate(0.25rem, 1rem);
	}
`;

const moveY = keyframes`
	0%,
	100% {
		transform: translate(0 0);
	}

	50% {
		transform: translate(-1rem, 0.5rem);
	}
`;

const rotate = keyframes`
	0% {
		transform: rotate(0) translate(-1rem) rotate(0);
	}

	100% {
		transform: rotate(1turn) translate(-1rem) rotate(-1turn);
	}
`;

const Particle: FunctionComponent<{ className?: string; interactive?: boolean; }> = ({ className, children, interactive }) => {
	const [left, setLeft] = useState(50);
	const [top, setTop] = useState(50);

	const reposition = () => {
		setLeft(between(12.5, 87.5));
		setTop(between(12.5, 87.5));
	}

	useLayoutEffect(() => {
		reposition();
	}, []);

	return (
		<svg
			className={['code', className].join(' ')}
			viewBox="0 0 50 50"
			onMouseDown={() => interactive && reposition()}
			style={{
				left: `${left}%`,
				top: `${top}%`,
			}}
			css={`
				cursor: pointer;
				user-select: none;
				position: absolute;
				display: block;
				width: 2rem;
				height: 2rem;
				transition: all ${(props: any) => props.theme.animation.duration.fast}s ease-in-out; 
				animation: ${moveX} ease-in-out 2s infinite;

				&:nth-child(2n) {
					animation: ${moveY} ease-in-out 2s infinite;

					${mobile} {
						opacity: 0;
						pointer-events: none;
					}
				}

				&:nth-child(3n) {
					animation: ${rotate} ease-in-out 3s infinite;
				}

				text {
					font-size: 2.5rem;
				}
			`}
		>
			{children}
		</svg>
	);
};

interface ParticlesProps {
	className?: string;
	amount: number;
	interactive?: boolean;
}

const Particles: FunctionComponent<ParticlesProps> = ({ className, amount, interactive }) => {
	const [particles, setParticles] = useState<JSX.Element[]>([]);
	const theme = useContext(ThemeContext);

	const allPaths = [...theme.particles.paths];
	const allColors = [...theme.particles.colors];

	useLayoutEffect(() => {
		// @ts-ignore
		const ids = [...Array(amount).keys()];

		const all = ids.map(id => {
			const pathIndex = between(0, allPaths.length);
			const colorIndex = between(0, allColors.length);

			const path = allPaths[pathIndex];
			const color = allColors[colorIndex];

			if(amount <= theme.particles.paths.length)
				allPaths.splice(pathIndex, 1);

			if(amount <= theme.particles.colors.length)
				allColors.splice(colorIndex, 1);

			return (
				<Particle
					key={id}
					interactive={interactive}
					css={`
						fill: ${color};
					`}
				>
					{path}
				</Particle>
			);
		});

		setParticles(all);
	}, []);

	return (
		<div className={className}>
			{particles}
		</div>
	)
}

export default styled(Particles)<ParticlesProps>`
	position: absolute;
	z-index: ${props => props.theme.layers.default.background};
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
`;