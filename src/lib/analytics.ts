import Cookie from 'js-cookie';

let win = window as any;

win.__analytics = null;

export default async (onAllowed: (analytics: any) => any): Promise<void> => {
	if (typeof window !== 'undefined' && Cookie.get('cookie-consent') !== 'true') {
		throw new Error('This script shouldn\'t be used in this place.');
	}

	if (win.__analytics !== null) {
		onAllowed(win.__analytics);
		return;
	}

	const {default: Analytics} = await import('analytics');
	const {default: GoogleAnalytics} = await import('@analytics/google-analytics');

	win.__analytics = Analytics({
		plugins: [
			GoogleAnalytics({
				trackingId: 'UA-165957143-1',
				anonymize: true
			})
		]
	});

	onAllowed(win.__analytics);
};
