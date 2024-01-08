const { createThemes } = require('tw-colors');

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	darkMode: 'class',

	theme: {},

	plugins: [
		createThemes({
			light: {
				base: '#ffffff',
				raised: '#e5e7eb',

				tooltip: '#d1d5db',

				divider: '#6b7280',

				'btn-hover': '#c9c9d1',
				'group-emphasized': '#d1d5db',
				'group-emphasized-hover': '#9ca3af',

				'btn-emphasized': '#000000',
				'btn-emphasized-text': '#000000',
				'btn-emphasized-text-hover': '#FFFFFF',
				'btn-emphasized-outline': '#000000',

				input: '#e5e7eb',

				'text-text': 'black'
			},
			dark: {
				base: '#171717',
				raised: '#262626',

				tooltip: '#4c4c4c',

				divider: '#9ca3af',

				'btn-hover': '#4c4c4c',
				'group-emphasized': '#262626',
				'group-emphasized-hover': '#202020',

				'btn-emphasized': '#FFFFFF',
				'btn-emphasized-text': '#FFFFFF',
				'btn-emphasized-text-hover': '#000000',
				'btn-emphasized-outline': '#FFFFFF',

				input: '#4c4c4c',

				'darker-text': '#e1e7f5',
				text: '#e1e7f5',
				emphasized: '#ebeef5',
				paragraph: '#cacfdb'
			},
			oled: {
				base: 'black',
				raised: '#18181b',

				tooltip: '#404040',

				divider: '#a1a1aa',

				'btn-hover': '#3f3f46',
				'group-emphasized': '#171717',
				'group-emphasized-hover': '#262626',

				'btn-emphasized': '#FFFFFF',
				'btn-emphasized-text': '#FFFFFF',
				'btn-emphasized-text-hover': '#000000',
				'btn-emphasized-outline': '#FFFFFF',

				input: '#3f3f46',

				'darker-text': '#e1e7f5',
				text: '#e1e7f5',
				emphasized: '#ebeef5',
				paragraph: '#cacfdb'
			}
		})
	]
};
