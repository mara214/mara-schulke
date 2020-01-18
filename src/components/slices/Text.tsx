import React, { FunctionComponent } from 'react';
import { RichText } from 'components/core/RichText';

interface TextSliceProps {
	slice: {
		primary: {
			content: any;
		};
	};
}

const TextSlice: FunctionComponent<TextSliceProps> = ({ slice }) => <RichText render={slice.primary.content} />;

export default TextSlice;
