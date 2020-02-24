import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { graphql } from 'gatsby';

import { linearGradient, rem } from 'lib/polished';

import MenuIcon from 'components/layout/menu/MenuIcon';
import Container from 'components/layout/Container';

const SearchOverlay = styled.div`
	position: fixed;
	height: 100vh;
	width: 100vw;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: ${props => props.theme.layers.overlay.background};
	background: ${props => linearGradient(props.theme.colors.highlightGradient)};
`;

interface SearchProps {
	onClose(): void;
}

const Search: FunctionComponent<SearchProps> = ({ onClose }) => {
	return (
		<SearchOverlay>
			<Container>
				<div
					css={`
						display: flex;
						justify-content: space-between;
						align-items: center;

						/* header height */
						height: ${rem(50)};
					`}>
					<input placeholder='search' />
					<MenuIcon
						inverted={true}
						open={true}
						onClick={onClose}
						css={`
							right: ${(props: any) => rem(-props.theme.spacings.small)};
						`}
					/>
				</div>
			</Container>
		</SearchOverlay>
	);
};

export default Search;
