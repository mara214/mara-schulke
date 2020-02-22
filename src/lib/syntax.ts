import * as ayu from 'ayu';
import { PrismTheme } from 'prism-react-renderer';

type AyuThemeVariant = 'dark' | 'light' | 'mirage';

function getPrismThemeFromAyu(variant: AyuThemeVariant): PrismTheme {
	const schema = ayu[variant];

	return {
		plain: {
			color: schema.common.fg.hex(),
			backgroundColor: schema.common.bg.hex()
		},
		styles: [
			{
				types: ['changed'],
				style: {
					color: schema.vcs.modified.hex(),
					fontStyle: 'italic'
				}
			},
			{
				types: ['deleted'],
				style: {
					color: schema.vcs.removed.hex(),
					fontStyle: 'italic'
				}
			},
			{
				types: ['inserted', 'attr-name'],
				style: {
					color: schema.vcs.added.hex(),
					fontStyle: 'italic'
				}
			},
			{
				types: ['comment'],
				style: {
					color: schema.syntax.comment.hex(),
					fontStyle: 'italic'
				}
			},
			{
				types: ['string', 'url'],
				style: {
					color: schema.syntax.string.hex()
				}
			},
			{
				// check this later
				types: ['variable', 'number', 'boolean', 'property'],
				style: {
					color: schema.syntax.entity.hex()
				}
			},
			{
				types: ['function'],
				style: {
					color: schema.syntax.func.hex()
				}
			},
			{
				types: ['builtin', 'char', 'constant'],
				style: {
					color: schema.syntax.constant.hex()
				}
			},
			{
				types: ['punctuation'],
				style: {
					color: schema.common.fg.hex()
				}
			},
			{
				types: ['selector', 'doctype', 'namespace'],
				style: {
					color: schema.syntax.special.hex(),
					fontStyle: 'italic'
				}
			},
			{
				types: ['class-name'],
				style: {
					color: schema.syntax.entity.hex()
				}
			},
			{
				types: ['tag'],
				style: {
					color: schema.syntax.tag.hex()
				}
			},
			{
				types: ['operator'],
				style: {
					color: schema.syntax.operator.hex()
				}
			},

			{
				types: ['keyword'],
				style: {
					color: schema.syntax.keyword.hex()
				}
			}
		]
	};
}

export const Dark: PrismTheme = getPrismThemeFromAyu('dark');
export const Light: PrismTheme = getPrismThemeFromAyu('light');
