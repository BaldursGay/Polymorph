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
				'btn-hover': '#d1d5db',
				'group-emphasized': '#d1d5db',
				'group-emphasized-hover': '#9ca3af',
				input: '#e5e7eb',

				'text-text': 'black'
			},
			dark: {
				base: '#1f2937',
				raised: '#111827',
				tooltip: '#374151',
				'btn-hover': '#374151',
				'btn-sidebar-hover': '#0f172a',
				'group-emphasized': '#1e293b',
				'group-emphasized-hover': '#0f172a',
				input: '#4b5563',

				'darker-text': '#e1e7f5',
				text: '#e1e7f5',
				emphasized: '#ebeef5',
				paragraph: '#cacfdb'
			},
			oled: {
				base: 'black',
				raised: '#18181b',
				tooltip: '#404040',
				'btn-hover': '#404040',
				'btn-sidebar-hover': '#0f172a',
				'group-emphasized': '#171717',
				'group-emphasized-hover': '#262626',
				input: '#3f3f46',

				'darker-text': '#e1e7f5',
				text: '#e1e7f5',
				emphasized: '#ebeef5',
				paragraph: '#cacfdb'
			}
		})
	]
};