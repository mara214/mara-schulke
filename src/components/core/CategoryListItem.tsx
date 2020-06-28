import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { rem } from 'lib/polished';
import { Link } from 'gatsby';


interface CategoryListItemProps {
	className?: string;
	category: {
		name: string;
		color: string;
		slug: string;
	}
}

const CategoryListItem: FunctionComponent<CategoryListItemProps> = ({ className, category: {name, color, slug} }) => {
	return (
		<li className={className}>
			<Link to={slug}>
				<h2>{name}</h2>
			</Link>
		</li>
	);
}

export default styled(CategoryListItem)<CategoryListItemProps>`
	cursor: pointer;
	background-color: ${props => props.category.color};
	border-radius: ${props => rem(props.theme.border.radius.rounded)};

	&, * {
		color: ${props => props.theme.colors.highlightForeground};
	}

	&, a {
		display: flex;
		align-items: center;
	}
	
	a {
		padding: ${props => rem(props.theme.spacings.large)};
		width: 100%;
		height: 100%;
	}

	h2 {
		border: 0;
		margin: 0;
		padding: 0;
	}

	&:hover * {
		text-decoration: none;
	}
`;