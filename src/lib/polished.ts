import { rem as prem } from 'polished';

export const rem = (px: string | number) => prem(px, 16);
export { lighten, transparentize, darken, normalize, linearGradient } from 'polished';
