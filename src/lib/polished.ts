import { rem as prem } from 'polished';

export const rem = (px: string | number) => prem(px, 18);
export { transparentize, darken, normalize, linearGradient } from 'polished';
