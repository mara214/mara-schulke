import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { graphql } from 'gatsby';

import { Layout } from 'layouts/default';
import { asText } from 'components/core/RichText';

import SEO from 'components/layout/SEO';

import TextSlice from 'components/slices/Text';
import ImageSlice from 'components/slices/Image';
import CodeSlice from 'components/slices/Code';
import PageTitle from 'components/core/PageTitle';

import { rem } from 'lib/polished';

interface PageProps {
	data: any;
	location: any;
}

const PageSlices: FunctionComponent<{ slices: any }> = ({ slices }) => {
	return slices.map((slice: any, index: number) => {
		switch (slice.type) {
			case 'text':
				return <TextSlice key={index} slice={slice} />;

			case 'image':
				return <ImageSlice key={index} slice={slice} />;

			case 'code':
				return <CodeSlice key={index} slice={slice} />;

			default:
				return <></>;
		}
	});
};

const Page: FunctionComponent<PageProps> = ({ data, location }) => {
	if (!data.prismic.page.edges[0]) {
		return <p>404</p>;
	}

	const page = data.prismic.page.edges[0].node;

	return (
		<Layout location={location}>
			<SEO lang='en' title={asText(page.title)} />
			<PageTitle title={page.title} />
		</Layout>
	);
};

export const query = graphql`
	query PageQuery($uid: String!) {
		prismic {
			page: allPages(uid: $uid) {
				edges {
					node {
						_meta {
							...DocumentMeta
						}
						title
					}
				}
			}
		}
	}
`;

export default Page;
