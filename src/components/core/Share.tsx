import React, { FunctionComponent } from 'react';

import Button from 'components/ui/Button';

import { rem } from 'lib/polished';

const Share: FunctionComponent<{}> = () => (
	<div
		css={`
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			margin: ${(props: any) => rem(props.theme.spacings.large)} 0;

			h2,
			p {
				margin-top: 0;
			}

			p {
				margin-bottom: ${(props: any) => rem(props.theme.spacings.small)};
			}

			${Button} {
				margin-bottom: 0;
			}
		`}>
		<h2>Enjoying this Post?</h2>
		<p>Share it to help me out!</p>
		<Button>Share on Twitter</Button>
	</div>
);

export default Share;
