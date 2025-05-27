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
			jest: eslintPluginJest,
		},
		languageOptions: {
			globals: {
				process: 'readonly',
			},
		},
		rules: {
			quotes: ['error', 'single'],
			'class-methods-use-this': 'off',
			'no-param-reassign': 'off',
			'no-unused-vars': ['error', { argsIgnorePattern: '^(_|next)$' }],
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
	{
		files: ['**/__tests__/**/*.js', '**/*.spec.js', '**/*.test.js'],
		plugins: {
			jest: eslintPluginJest,
		},
		languageOptions: {
			globals: {
				jest: 'readonly',
				describe: 'readonly',
				it: 'readonly',
				expect: 'readonly',
				beforeEach: 'readonly',
				afterEach: 'readonly',
			},
		},
		rules: {
			...eslintPluginJest.configs.recommended.rules,
		},
	},
];
