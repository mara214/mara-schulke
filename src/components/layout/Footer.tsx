import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

import { rem } from 'lib/polished';
import { mobile, tablet } from 'lib/media';

import Container from 'components/layout/Container';

const FooterContainer = styled.div`
	&, * {
		color: ${props => props.theme.colors.navigationForeground};
		background-color: ${props => props.theme.colors.navigationBackground};
	}

	ul {
		margin: 0;

		li {
			list-style: none;
			padding-right: ${props => rem(props.theme.spacings.medium)};

			&:last-child {
				padding: 0;
			}
		}
	}
`;

interface FooterProps {}

const Footer: FunctionComponent<FooterProps> = () => {
	const renderExternalLink = ({ to, text }: { to: string; text: string; }) => <p>- <a href={to} target="_blank" rel="noopener">{text}</a></p>;
	const renderInternalLink = ({ to, text }: { to: string; text: string; }) => <p>- <Link to={to}>{text}</Link></p>;

	return (
		<FooterContainer>
			<Container>
				<hr/>
				<pre css={`padding: 0;`}>
					<p>by("Maximilian Schulke").in(2020);</p>
					{renderExternalLink({ to: 'https://github.com/schulke-214', text: 'GitHub' })}
					{renderExternalLink({ to: 'https://reddit.com/u/schulke-214', text: 'Reddit' })}
					{renderInternalLink({ to: '/imprint', text: 'Imprint' })}
					{renderInternalLink({ to: '/data-privacy', text: 'Data Privacy' })}
				</pre>
				<hr/>
			</Container>
		</FooterContainer>
	);
};

export default Footer;
