import React, { FunctionComponent } from 'react';

import Button from 'components/ui/Button';

import { rem } from 'lib/polished';
import { landscape } from 'lib/media';

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
				max-width: 50%;
				text-align: center;

				${landscape} {
					max-width: 100%;
				}
			}

			${Button} {
				margin-bottom: 0;
			}
		`}>
		<h2>Enjoying this Post?</h2>
		<p>If you appreciate my content, think about sharing my posts or giving this project a star on github! </p>
		<a href='https://github.com/schulke-214/maximilian-schulke' target='__blank'>
			<Button>Go To GitHub</Button>
		</a>
	</div>
);

export default Share;
