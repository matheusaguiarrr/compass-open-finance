import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import unusedImports from 'eslint-plugin-unused-imports';

export default [
	js.configs.recommended,
	prettier,
	{
		files: ['**/*.{js,mjs,cjs}'],
		plugins: {
			'unused-imports': unusedImports,
			'simple-import-sort': simpleImportSort,
		},
		rules: {
			quotes: ['error', 'single'],
			'class-methods-use-this': 'off',
			'no-param-reassign': 'off',
			'no-unused-vars': ['error', { argsIgnorePattern: 'next' }],
			'unused-imports/no-unused-imports': 'error',
			'unused-imports/no-unused-vars': [
				'warn',
				{
					vars: 'all',
					varsIgnorePattern: '^_',
					args: 'after-used',
					argsIgnorePattern: '^_',
				},
			],
			'simple-import-sort/imports': 'error',
			'simple-import-sort/exports': 'error',
		},
	},
];
