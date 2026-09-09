import { FlatCompat } from '@eslint/eslintrc';

// ESLint 9 is pinned for eslint-config-next 15.5 compatibility.
// ESLint 9 is EOL; revisit this setup when the plugins support ESLint 10.

const compat = new FlatCompat({
	baseDirectory: import.meta.dirname,
});

const eslintConfig = [
	{
		ignores: ['.next/**', 'out/**', 'build/**', 'coverage/**', 'next-env.d.ts'],
	},
	{
		files: ['**/*.{js,jsx,mjs,cjs}'],
	},
	...compat.extends('next/core-web-vitals'),
];

export default eslintConfig;
