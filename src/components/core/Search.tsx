import React, { FunctionComponent } from 'react';

import { rem } from 'lib/polished';

import MenuIcon from 'components/layout/menu/MenuIcon';
import Container from 'components/layout/Container';
import Overlay from 'components/ui/Overlay';

interface SearchProps {
	onClose(): void;
}

const Search: FunctionComponent<SearchProps> = ({ onClose }) => {
	return (
		<Overlay>
			<Container>
				<div
					css={`
						display: flex;
						justify-content: space-between;
						align-items: center;

						/* header height */
						height: ${rem(50)};
					`}>
					<input placeholder='search' />
					<MenuIcon
						inverted={true}
						open={true}
						onClick={onClose}
						css={`
							right: ${(props: any) => rem(-props.theme.spacings.small)};
						`}
					/>
				</div>
			</Container>
		</Overlay>
	);
};

export default Search;
