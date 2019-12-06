import React, { FunctionComponent } from 'react';
import { RichText } from 'components/core/RichText';

interface ImageSliceProps {
	slice: {
		primary: {
			image: any;
			description: any;
		};
	};
}

const ImageSlice: FunctionComponent<ImageSliceProps> = ({ slice }) => (
	<div>
		<p className='mobile-fullscreen-image'>
			<img src={slice.primary.image.url} />
		</p>
		<RichText render={slice.primary.description} />
	</div>
);

export default ImageSlice;
