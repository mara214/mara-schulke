declare module 'react-social-icons' {
	export interface SocialIconProps {
		className?: string;
		bgColor?: string;
		label?: string;
		network?: string;
		url: string;
		[key: string]: any;
	}
	export const SocialIcon: React.FunctionComponent<SocialIconProps>;
}
