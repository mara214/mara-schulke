import React, { FunctionComponent } from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'gatsby';

import { mobile } from 'lib/media';
import { rem } from 'lib/polished';
import { Invertible } from 'components/layout/Header';

const AvatarContainer = styled.span<Invertible>`
	display: block;
	border-radius: 10rem;
	overflow: hidden;
	width: ${rem(50)};
	height: ${rem(50)};
	background-color: ${props => props.theme.colors.muted};

	img {
		margin: 0;
		width: ${rem(50)};
		height: ${rem(50)};
	}

	${props =>
		props.inverted &&
		css`
			background-color: ${props.theme.colors.highlightLight};
		`}
`;

const Avatar: FunctionComponent<Invertible> = ({ inverted }) => (
	<AvatarContainer inverted={inverted}>
		<img src='/assets/maximilian-schulke.png' alt='portrait' />
	</AvatarContainer>
);

const Title = styled.span<Invertible>`
	color: ${props => props.theme.colors.foreground};
	white-space: nowrap;

	${props =>
		props.inverted &&
		css`
			color: ${props => props.theme.colors.highlightForeground};
		`}
`;

const HeaderHomeLink: FunctionComponent<Invertible> = ({ inverted }) => {
	return (
		<Link to='/' style={{ display: 'flex', width: 'min-content', alignItems: 'center' }}>
			<span style={{ marginRight: '1rem' }}>
				<Avatar inverted={inverted} />
			</span>
			<Title
				inverted={inverted}
				css={`
					${mobile} {
						display: none;
					}
				`}>
				Maximilian Schulke
			</Title>
		</Link>
	);
};

export default HeaderHomeLink;
