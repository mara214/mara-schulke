import React, { FunctionComponent } from 'react';
import { RichText as PrismicRichText } from 'prismic-reactjs';

import { HTMLserializer } from 'utils/prismic/html-serializer';
import { link, href } from 'utils/prismic/config';

export interface RichTextProps {
	render: object;
}

export const RichText: FunctionComponent<RichTextProps> = ({ render }) => (
	<PrismicRichText render={render} htmlSerializer={HTMLserializer} linkResolver={link} hrefResolver={href} />
);

export const asText = PrismicRichText.asText;
