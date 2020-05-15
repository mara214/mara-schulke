import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

import FormError from 'components/ui/form/Error';

const InputContainer = styled.input``;

export interface InputProps {
	error?: string;
}

const Input: FunctionComponent<InputProps> = ({ error }) => {
	return (
		<InputContainer>
			<span></span>
			{error && <FormError>{error}</FormError>}
		</InputContainer>
	);
};

export default Input;
