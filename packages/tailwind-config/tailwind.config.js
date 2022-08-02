module.exports = {
	mode: 'jit',
	content: ['../../apps/**/*.{html,js,jsx,ts, tsx}', '../../packages/**/*.{html,js,jsx,ts, tsx}'],

	theme: {
		fontFamily: {
			sans: ['AtlasGrotesk', '"TWK Lausanne"', 'Graphik', 'sans-serif'],
			serif: ['Apoc LC', 'Ogg', 'Merriweather', 'serif']
		},
		colors: {
			black: '#000',
			white: '#FFF',
			primary: '#1700EE',
			secondary: '#FEE803',
			gray: '#D9D8D7',
			red: '#FF5257',
			purple: '#4636D2',
			turquoise: '#2BE0CE'
		},

		extend: {}
	},

	plugins: [require('@tailwindcss/typography')]
};
