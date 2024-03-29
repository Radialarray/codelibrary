module.exports = {
	root: true,
	// This tells ESLint to load the config from the package `eslint-config-custom`
	extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'next', 'prettier'],
	rules: {
		'@next/next/no-html-link-for-pages': 'off',
		'react/jsx-key': 'off'
	},
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint'],
	ignorePatterns: ['*.cjs', 'node_modules', 'build', 'dist', 'public', 'cms'],
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
	},
	settings: {
		next: {
			rootDir: ['apps/*/']
		}
	}
};
