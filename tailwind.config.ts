import { join } from 'path';

import { skeleton } from '@skeletonlabs/tw-plugin';

import { mainTheme } from './src/lib/themes/main';

/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')
	],

	darkMode: 'class',

	theme: {},

	plugins: [
		skeleton({
			themes: {
				custom: [mainTheme]
			}
		})
	]
};
