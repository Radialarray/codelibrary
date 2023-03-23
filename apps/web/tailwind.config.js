/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		fontFamily: {
			sans: ['AtlasGrotesk', 'sans-serif']
		},
		extend: {
			colors: {
				'light-gray': '#F1F1F1',
				gray: '#767676',
				highlight: '#F9F942',
				'light-highlight': '#FCFCD8',
				'dark-highlight': '#EBEB26'
			}
		}
	},
	plugins: [require('@tailwindcss/typography'), require('@tailwindcss/line-clamp')]
};
