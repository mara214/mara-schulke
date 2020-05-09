import React from 'react';
import styled, { css } from 'styled-components';
import { rem } from 'lib/polished';

interface ButtonProps {
	muted?: boolean;
	slim?: boolean;
}

export default styled.button<ButtonProps>`
	background-color: transparent;
	cursor: pointer;

	&:hover {
		text-decoration: underline;
	}
`;
