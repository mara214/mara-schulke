import { rem } from 'lib/polished';

export const breakpoints = {
    lg: 992,
    md: 760,
    sm: 576
};

export const desktop = `@media (min-width: ${rem(breakpoints.lg)})`;
export const tablet = `@media (max-width: ${rem(breakpoints.lg)})`;
export const landscape = `@media (max-width: ${rem(breakpoints.md)})`;
export const mobile = `@media (max-width: ${rem(breakpoints.sm)})`;
