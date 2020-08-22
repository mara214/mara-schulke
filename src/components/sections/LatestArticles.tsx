import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import ArticleList from 'components/core/ArticleList';
import { rem } from 'lib/polished';
import { Link } from 'gatsby';

interface LatestArticlesProps {
	className?: string;
}

const LatestArticles: FunctionComponent<LatestArticlesProps> = ({}) => {
	return (
		<>
			<h2>Latest Articles</h2>
			<ArticleList
				css={`padding-top: ${(props: any) => rem(props.theme.spacings.small)};`}
				max={5}
				withCategory
			/>
		</>
	);
}

export default styled(LatestArticles)<LatestArticlesProps>``;