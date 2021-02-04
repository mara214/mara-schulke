declare module 'react-latex' {
	import React from 'react';

	type LatexProps = {
		displayMode?: boolean
	};

	export default class Latex extends React.Component<LatexProps> {}
}
