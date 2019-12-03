import { rem } from 'polished';

export const desktop = `@media (min-width: ${rem(992)})`;
export const tablet = `@media (max-width: ${rem(992)})`;
export const landscape = `@media (max-width: ${rem(760)})`;
export const mobile = `@media (max-width: ${rem(576)})`;
