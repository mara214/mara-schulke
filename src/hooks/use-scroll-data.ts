import { useState, useLayoutEffect } from 'react';

import Debouncer from 'utils/debounce';

export type ScrollData = {
	x: number;
	y: number;
	deltaX: number;
	deltaY: number;
}

export function useScrollData(debounce: number): ScrollData {
	const debouncer = new Debouncer(debounce);
	const [x, setX] = useState(0);
	const [y, setY] = useState(0);
	const [deltaX, setDeltaX] = useState(0);
	const [deltaY, setDeltaY] = useState(0);

	useLayoutEffect(() => {
		const handleScroll = (ev: WheelEvent): void => {
			debouncer.call(() => {
				setX(window.scrollX);
				setY(window.scrollY);
				setDeltaX(ev.deltaX);
				setDeltaY(ev.deltaY);
			});
		};

		window.addEventListener('wheel', handleScroll as any);

		return () => window.removeEventListener('wheel', handleScroll as any);
	}, [])

	return {
		x,
		y,
		deltaX,
		deltaY
	}
}