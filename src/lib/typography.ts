import Typography from 'typography';

export const fonts = {
	light: 'Inter UI Light',
	regular: 'Inter UI Regular',
	regularItalic: 'Inter UI Regular Italic',
	bold: 'Inter UI Bold',
	boldItalic: 'Inter UI Bold Italic'
};

const typography = new Typography({
	baseFontSize: '16px',
	baseLineHeight: 1.8,
	headerLineHeight: 1.4,
	headerFontFamily: [fonts.bold, 'sans-serif'],
	bodyFontFamily: [fonts.regular, 'sans-serif'],
	overrideStyles: props => ({
		'h1,h2,h3,h4,h5,h6': {
			lineHeight: 1.25
		},
		'h1,h2,h3,h4': {
			lineHeight: 1.4,
			marginBottom: props.rhythm(0.75)
		}
	})
});

// Hot reload typography in development.
if (process.env.NODE_ENV !== 'production') {
	typography.injectStyles();
}

export default typography;
export const rhythm = typography.rhythm;
export const scale = typography.scale;
