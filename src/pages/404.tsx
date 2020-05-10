import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

import Layout from 'layouts/default';

interface NotFoundProps {
	data: any;
}

const NotFound: FunctionComponent<NotFoundProps> = ({ data }) => {
	return (
		<Layout readMode={false}>
			<h1>404 - Not Found</h1>
			<img src="/404.gif" alt="will ferell" />
		</Layout>
	);
};

export default NotFound;
