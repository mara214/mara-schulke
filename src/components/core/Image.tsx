import React, { FunctionComponent } from 'react';

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
	</div>
);

export default ImageSlice;
