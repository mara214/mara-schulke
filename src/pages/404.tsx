import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

import Layout from 'layouts/default';

interface NotFoundProps {
	data: any;
}

const NotFound: FunctionComponent<NotFoundProps> = ({ data }) => {
	return (
		<Layout readMode={false}>
			<h1 style={{ paddingTop: '65px' }}>404 - Not Found</h1>
		</Layout>
	);
};

export default NotFound;
