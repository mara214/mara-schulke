import React, { FunctionComponent } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import styled from 'styled-components';

import Particles from 'components/core/Particles';

import { rem } from 'lib/polished';
import { mobile } from 'lib/media';

interface SupportProps {
	className?: string;
}

const Support: FunctionComponent<SupportProps> = ({ className }) => {
	const { site: { siteMetadata: { support } } } = useStaticQuery(graphql`
		{
			site {
				siteMetadata {
					support {
						headline
						cta
						url
						description
					}
				}
			}
		}
	`);

	return (
		<div
			className={className}
		>
			<h3>{support.headline}</h3>
			<a href={support.url} target="_blank">{support.cta}</a>
			<p>{support.description}</p>
			<Particles amount={4}/>
		</div>
	)
}

export default styled(Support)<SupportProps>`
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	padding: ${props => rem(props.theme.spacings.large)} 0;

	> * {
		text-align: center;
	}

	a {
		text-decoration: underline;
	}

	p {
		width: 50%;
		margin-top: 0.5rem;
		margin-bottom: 0;

		${mobile} {
			width: 100%;
		}
	}
`;