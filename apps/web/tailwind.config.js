/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		fontFamily: {
			sans: ['AtlasGrotesk', 'sans-serif']
		}
	},
	plugins: [require('@tailwindcss/typography')]
};
