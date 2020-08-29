import { useState, useLayoutEffect } from 'react';

import Debouncer from 'utils/debounce';

export type ScrollData = {
	x: number;
	y: number;
}

export function useScrollData(debounce: number): ScrollData {
	const debouncer = new Debouncer(debounce);
	const [x, setX] = useState(0);
	const [y, setY] = useState(0);

	useLayoutEffect(() => {
		const handleScroll = (): void => {
			debouncer.call(() => {
				setX(window.scrollX);
				setY(window.scrollY);
			});
		};

		window.addEventListener('scroll', handleScroll as any);

		return () => window.removeEventListener('scroll', handleScroll as any);
	}, [])

	return { x, y }
}
