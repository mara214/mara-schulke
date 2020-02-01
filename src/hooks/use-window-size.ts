import { useEffect, useState } from "react";

export type WindowSize = {
    width?: number;
    height?: number;
}

export function useWindowSize(): WindowSize {
    const isClient = typeof window === 'object';

    const getSize = (): WindowSize => ({
        width: isClient ? window.innerWidth : undefined,
        height: isClient ? window.innerHeight : undefined
    });

    const [windowSize, setWindowSize] = useState(getSize);

    useEffect(() => {
        if (!isClient) {
            return;
        }

        function handleResize() {
            setWindowSize(getSize());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowSize;
};