import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import postcssImport from 'postcss-import';
import presetEnv from 'postcss-preset-env';
import nesting from 'tailwindcss/nesting';
const mode = process.env.NODE_ENV;
const dev = mode === 'development';

const config = {
	plugins: [
		//Some plugins, like tailwindcss/nesting, need to run before Tailwind,
		postcssImport(),
		nesting(),
		tailwindcss(),
		presetEnv({
			/* use stage 3 features + css nesting rules */
			stage: 3,
			features: {
				'nesting-rules': true
			}
		}),
		//But others, like autoprefixer, need to run after,
		!dev && autoprefixer(),
		cssnano({
			preset: 'default'
		})
	]
};

export default config;
