import React from 'react';

import { Layout } from 'layouts/default';
import { graphql } from 'gatsby';

export const query = graphql`
	query HomePage($uid: String!, $lang: String!) {
		prismic {
			homePage(uid: $uid, lang: $lang) {
				title
				intoduction
			}
		}
	}
`;

export default () => (
	<Layout>
		<h1>This is a headline</h1>
		<h2>This is another headline</h2>
		<h3>This is a sub headline</h3>
		<h4>Boom another headline</h4>
		<a href='test'>test</a>
	</Layout>
);
