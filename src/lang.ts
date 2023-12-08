export interface ILang {
	[key: string]: {
		text: string;
		lng: 'en' | 'fr';
		icon: string;
	};
}

const LANG: ILang = {
	EN: {
		text: 'English',
		lng: 'en',
		icon: 'CustomUsa',
	},
	FR: {
		text: 'Français',
		lng: 'fr',
		icon: 'CustomFrance',
	},
};

export const getLangWithKey = (key: ILang['key']['lng']): ILang['key'] => {
	// @ts-ignore
	return LANG[Object.keys(LANG).filter((f) => key.includes(LANG[f].lng))];
};

export default LANG;
