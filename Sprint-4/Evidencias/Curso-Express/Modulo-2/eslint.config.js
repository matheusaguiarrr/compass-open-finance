import js from '@eslint/js';
import prettier from 'eslint-config-prettier';

export default [
	js.configs.recommended,
	prettier,
	{
		extends: ['prettier'],
		files: ['/*.{js,mjs,cjs}'],
		rules: {
			quotes: ['error', 'single'],
			'class-methods-use-this': 'off',
			'no-param-reassign': 'off',
			'no-unused-vars': ['error', { argsIgnorePattern: 'next' }],
		},
	},
];
