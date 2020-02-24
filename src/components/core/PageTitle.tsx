import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

import { RichText } from 'components/core/RichText';
import { rem } from 'lib/polished';

const RawPageTitle: FunctionComponent<{ title: any; className?: string }> = ({ title, className }) => (
	<div className={className}>
		<RichText render={title} />
	</div>
);

const PageTitle = styled(RawPageTitle)`
	margin-bottom: ${props => rem(props.theme.spacings.large)};

	&,
	h1,
	span {
		text-align: center;
	}

	h1 {
		margin-bottom: 0;
	}

	span {
		font-size: ${rem(12)};
	}
`;

export default PageTitle;
