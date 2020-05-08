import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { graphql } from 'gatsby';

// import Layout from 'layouts/default';

interface ArticleProps {
	data: any;
}

const Article: FunctionComponent<ArticleProps> = ({ data }) => {
	return <pre>{JSON.stringify(data, null, 4)}</pre>
};

export const query = graphql`
	query ArticleQuery($slug: String!) {
		article(slug: { eq: $slug }) {
			slug
			title
			body
			timeToRead
		}
	}
`;

export default Article;
