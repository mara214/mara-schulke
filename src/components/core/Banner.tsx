import React from 'react';
import styled, { css } from 'styled-components';
import { rem } from 'polished';

import { mobile } from 'lib/media';

interface BannerImage {
	dimensions: {
		width: number;
		height: number;
	};
	alt: string;
	copyright: string;
	url: string;
}

interface BannerProps {
	banner: BannerImage & {
		mobile: BannerImage;
	};
}

const Banner = (props: BannerProps) => {
	return (
		<picture className='mobile-fullscreen-image'>
			<source srcSet={props.banner.mobile.url} media='(max-width: 760px)' />
			<img src={props.banner.url} alt={props.banner.alt} />
		</picture>
	);
};

export default styled(Banner)<BannerProps>``;
