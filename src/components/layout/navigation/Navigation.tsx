import React, { FunctionComponent } from 'react';
import styled, { css } from 'styled-components';
import { graphql, useStaticQuery } from 'gatsby';

import { breakpoints, landscape } from 'lib/media';

import NavigationItem from 'components/layout/navigation/NavigationItem';
import NavigationItemRound from 'components/layout/navigation/NavigationItemRound';
import NavigationItemIcon from 'components/layout/navigation/NavigationItemIcon';
import NavigationThemeToggleIcon from 'components/layout/navigation/NavigationThemeToggleIcon';

import { Openable } from 'components/layout/Header';
import { useWindowSize, WindowSize } from 'hooks/use-window-size';

const Search: FunctionComponent = () => (
	<NavigationItemIcon
		strokeWidth={0}
		css={`
			fill: currentColor;

			:hover {
				fill: currentColor;
			}
		`}>
		<path d='M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z' />
	</NavigationItemIcon>
);

const SearchWrapperHotfix = css`
	svg {
		fill: ${props => props.theme.colors.foreground};
	}

	:hover svg {
		fill: ${props => props.theme.colors.highlightForeground};
	}

	${(props: any) =>
		props.inverted &&
		css`
			svg {
				fill: ${props => props.theme.colors.highlightForeground};
			}

			:hover svg {
				fill: ${props => props.theme.colors.highlightForeground};
			}
		`}
`;

const NavigationContainer = styled.ul`
	display: flex;
	align-items: center;
	list-style: none;
	margin: 0;

	${landscape} {
		flex-direction: column;
	}
`;

interface NavigationProps extends Openable {
	toggleTheme(): void;
	openSearch(): void;
	setOpen(newState: boolean): void;
}

const Navigation: FunctionComponent<NavigationProps> = ({ open, toggleTheme, setOpen }) => {
	const links = useStaticQuery(graphql`
		{
			all: allPage(filter: { navigatable: { eq: true }}) {
				edges {
					node {
						title
						slug
					}
				}
			}
		}
	`).all.edges.map(({ node }: any) => node);

	const size: WindowSize = useWindowSize();

	return (
		<nav>
			<NavigationContainer>
				{links.map(({ slug, title }: any) => 
					<NavigationItem key={slug} to={slug}>
						{title}
					</NavigationItem>
				)}
				{/* <NavigationItemRound
					inverted={inverted}
					onClick={() => {
						openSearch();
						setOpen(false);
					}}
					css={SearchWrapperHotfix}>
					<Search inverted={inverted} />
				</NavigationItemRound>
				 */}
				<NavigationItemRound
					onClick={() => {
						toggleTheme();
						setOpen(false);
					}}>
					<NavigationThemeToggleIcon />
				</NavigationItemRound>
			</NavigationContainer>
		</nav>
	);
};

export default Navigation;
