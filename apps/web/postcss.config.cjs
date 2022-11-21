const config = require('../../packages/tailwind-config/tailwind.config.js');

module.exports = {
	plugins:
		process.env.NODE_ENV === 'production'
			? {
					//Some plugins, like tailwindcss/nesting, need to run before Tailwind,
					'tailwindcss/nesting': {},
					tailwindcss: {config},
					'postcss-flexbugs-fixes': {},

					'postcss-preset-env': {
						/* use stage 3 features + css nesting rules */
						stage: 3,
						features: {
							'nesting-rules': true,
							'custom-properties': false
						},
						autoprefixer: {}
					},
					//But others, like autoprefixer, need to run after,
					cssnano: {
						preset: 'default'
					}
			  }
			: {
					// Only some transformations in development
					'tailwindcss/nesting': {},
					tailwindcss: {config}
			  }
};
