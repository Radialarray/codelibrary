module.exports = {
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'next',
		'prettier',
		'turbo'
	],
	rules: {
		'@next/next/no-html-link-for-pages': 'off',
		'react/jsx-key': 'off'
	},
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint'],
	ignorePatterns: ['*.cjs', 'node_modules', 'build', 'dist', 'public'],
	parserOptions: {
		ecmaFeatures: {
			jsx: true
		},
		sourceType: 'module',
		ecmaVersion: 2019
	},
	env: {
		browser: true,
		es2017: true,
		node: true
	}
};
