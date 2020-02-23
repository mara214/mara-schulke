import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { graphql } from 'gatsby';

import { Layout } from 'layouts/default';
import { RichText } from 'components/core/RichText';

const SmallDate = styled.p``;

interface PrivacyPolicyProps {
	data: any;
	location: any;
}

const PrivacyPolicy: FunctionComponent<PrivacyPolicyProps> = ({ data, location }) => {
	const { node: page } = data.prismic.page.edges[0];
	const lastUpdate = page._meta.lastPublicationDate
		.substr(0, 10)
		.split('-')
		.reverse()
		.join('.');

	return (
		<Layout location={location}>
			<RichText render={page.title} />
			<span>{lastUpdate}</span>
		</Layout>
	);
};

export const query = graphql`
	query PrivacyPolicy {
		prismic {
			page: allPrivacyPolicys(lang: "en-us") {
				edges {
					node {
						_meta {
							lastPublicationDate
						}
						title
					}
				}
			}
		}
	}
`;

export default PrivacyPolicy;
