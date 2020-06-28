import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { useStaticQuery, graphql } from 'gatsby';

import CategoryListItem from './CategoryListItem';
import { rem } from 'lib/polished';
import { landscape } from 'lib/media';


interface CategoryListProps {
	className?: string;
}

interface Category {
	name: string;
	color: string;
	slug: string;
}

const CategoryList: FunctionComponent<CategoryListProps> = ({ className }) => {
	const categories: [Category] = useStaticQuery(graphql`
		{
			site {
				siteMetadata {
					categories {
						name
						color
						slug
					}
				}
			}
		}
	`).site.siteMetadata.categories.sort((a: Category, b: Category) => {
		const fst = a.name.toUpperCase();
		const snd = b.name.toUpperCase();

		if (fst < snd) {
			return -1;
		}

		else if (fst > snd) {
			return 1;
		}

		return 0;
	});

	return (
		<ul className={className}>
			{categories.map((c => <CategoryListItem category={c} key={c.slug} />))}			
		</ul>
	);
}

export default styled(CategoryList)<CategoryListProps>`
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-auto-rows: ${props => rem(2.5 * props.theme.spacings.xlarge)};
	grid-gap: ${props => rem(props.theme.spacings.large)};

	${landscape} {
		grid-template-columns: 1fr;
		grid-gap: ${props => rem(props.theme.spacings.medium)};
	}
`;