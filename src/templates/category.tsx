import React, { FunctionComponent } from 'react';
import { graphql } from 'gatsby';

import Layout from 'layouts/default';
import SEO from 'components/layout/SEO';
import ArticleList from 'components/core/ArticleList';
import Stage from 'components/core/Stage';

interface CategoryProps {
	data: any;
	pageContext: any;
	location: any;
}

const Category: FunctionComponent<CategoryProps> = ({ data, pageContext, location }) => {
	const { categories } = data.site.siteMetadata;

	const category: any = categories.find(({ slug }: any) => slug === pageContext.slug);

	return (
		<Layout hasStage>
			<SEO
				title={category.name}
				description={`A list of all articles which are related to ${category.name.toLowerCase()}`}
				url={location.href ?? ''}
			/>
			<Stage title={category.name} />
			<ArticleList filter={article => article.category.slug === category.slug} />
		</Layout>
	);
};

export const query = graphql`
	query CategoryQuery {
		site {
			siteMetadata {
				categories {
					name
					slug
					color
				}
			}
		}
	}
`;

export default Category;
