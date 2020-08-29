import { useState, useLayoutEffect } from 'react';

import Debouncer from 'utils/debounce';

export type ScrollData = {
	x: number;
	y: number;
	deltaY: number;
}

export function useScrollData(debounce: number): ScrollData {
	const debouncer = new Debouncer(debounce);
	const [x, setX] = useState(0);
	const [y, setY] = useState(0);
	const [deltaY, setDeltaY] = useState(0);

	useLayoutEffect(() => {
		let lastY = 0;
		const handleScroll = (): void => {
			debouncer.call(() => {
				setX(window.scrollX);
				setY(window.scrollY);
				setDeltaY(window.scrollY - lastY);

				lastY = window.scrollY <= 0 ? 0: window.scrollY;
			});
		};

		window.addEventListener('scroll', handleScroll as any);

		return () => window.removeEventListener('scroll', handleScroll as any);
	}, [])

	return { x, y, deltaY };
}
