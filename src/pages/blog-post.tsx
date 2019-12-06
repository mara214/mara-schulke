import React, { FunctionComponent } from 'react';
import { graphql } from 'gatsby';
import { Link } from 'gatsby';
import styled from 'styled-components';

import { Layout } from 'layouts/default';
import { RichText } from 'components/core/RichText';

import Button from 'components/core/Button';
import SEO from 'components/layout/SEO';

interface BlogPostProps {
	data: any;
}

const BlogPostContainer = styled.div`
	h1 {
		margin-top: 0;
	}
`;

const BlogPost: FunctionComponent<BlogPostProps> = ({ data }) => {
	return (
		<Layout>
			<BlogPostContainer>
				<SEO lang='en' title='Blog' />
			</BlogPostContainer>
		</Layout>
	);
};

//export const query = graphql``;

export default BlogPost;
