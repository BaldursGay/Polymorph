import type { CustomThemeConfig } from '@skeletonlabs/tw-plugin';

export const mainTheme: CustomThemeConfig = {
	name: 'main-theme',
	properties: {
		// =~= Theme Properties =~=
		'--theme-font-family-base': `Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'`,
		'--theme-font-family-heading': `system-ui`,
		'--theme-font-color-base': '0 0 0',
		'--theme-font-color-dark': '255 255 255',
		'--theme-rounded-base': '12px',
		'--theme-rounded-container': '16px',
		'--theme-border-base': '1px',
		// =~= Theme On-X Colors =~=
		'--on-primary': '0 0 0',
		'--on-secondary': '0 0 0',
		'--on-tertiary': '255 255 255',
		'--on-success': '0 0 0',
		'--on-warning': '0 0 0',
		'--on-error': '0 0 0',
		'--on-surface': '255 255 255',
		// =~= Theme Colors  =~=
		// primary | #f58142
		'--color-primary-50': '254 236 227', // #feece3
		'--color-primary-100': '253 230 217', // #fde6d9
		'--color-primary-200': '253 224 208', // #fde0d0
		'--color-primary-300': '251 205 179', // #fbcdb3
		'--color-primary-400': '248 167 123', // #f8a77b
		'--color-primary-500': '245 129 66', // #f58142
		'--color-primary-600': '221 116 59', // #dd743b
		'--color-primary-700': '184 97 50', // #b86132
		'--color-primary-800': '147 77 40', // #934d28
		'--color-primary-900': '120 63 32', // #783f20
		// secondary | #33adde
		'--color-secondary-50': '224 243 250', // #e0f3fa
		'--color-secondary-100': '214 239 248', // #d6eff8
		'--color-secondary-200': '204 235 247', // #ccebf7
		'--color-secondary-300': '173 222 242', // #addef2
		'--color-secondary-400': '112 198 232', // #70c6e8
		'--color-secondary-500': '51 173 222', // #33adde
		'--color-secondary-600': '46 156 200', // #2e9cc8
		'--color-secondary-700': '38 130 167', // #2682a7
		'--color-secondary-800': '31 104 133', // #1f6885
		'--color-secondary-900': '25 85 109', // #19556d
		// tertiary | #9433de
		'--color-tertiary-50': '239 224 250', // #efe0fa
		'--color-tertiary-100': '234 214 248', // #ead6f8
		'--color-tertiary-200': '228 204 247', // #e4ccf7
		'--color-tertiary-300': '212 173 242', // #d4adf2
		'--color-tertiary-400': '180 112 232', // #b470e8
		'--color-tertiary-500': '148 51 222', // #9433de
		'--color-tertiary-600': '133 46 200', // #852ec8
		'--color-tertiary-700': '111 38 167', // #6f26a7
		'--color-tertiary-800': '89 31 133', // #591f85
		'--color-tertiary-900': '73 25 109', // #49196d
		// success | #33de41
		'--color-success-50': '224 250 227', // #e0fae3
		'--color-success-100': '214 248 217', // #d6f8d9
		'--color-success-200': '204 247 208', // #ccf7d0
		'--color-success-300': '173 242 179', // #adf2b3
		'--color-success-400': '112 232 122', // #70e87a
		'--color-success-500': '51 222 65', // #33de41
		'--color-success-600': '46 200 59', // #2ec83b
		'--color-success-700': '38 167 49', // #26a731
		'--color-success-800': '31 133 39', // #1f8527
		'--color-success-900': '25 109 32', // #196d20
		// warning | #dea533
		'--color-warning-50': '250 242 224', // #faf2e0
		'--color-warning-100': '248 237 214', // #f8edd6
		'--color-warning-200': '247 233 204', // #f7e9cc
		'--color-warning-300': '242 219 173', // #f2dbad
		'--color-warning-400': '232 192 112', // #e8c070
		'--color-warning-500': '222 165 51', // #dea533
		'--color-warning-600': '200 149 46', // #c8952e
		'--color-warning-700': '167 124 38', // #a77c26
		'--color-warning-800': '133 99 31', // #85631f
		'--color-warning-900': '109 81 25', // #6d5119
		// error | #de3333
		'--color-error-50': '250 224 224', // #fae0e0
		'--color-error-100': '248 214 214', // #f8d6d6
		'--color-error-200': '247 204 204', // #f7cccc
		'--color-error-300': '242 173 173', // #f2adad
		'--color-error-400': '232 112 112', // #e87070
		'--color-error-500': '222 51 51', // #de3333
		'--color-error-600': '200 46 46', // #c82e2e
		'--color-error-700': '167 38 38', // #a72626
		'--color-error-800': '133 31 31', // #851f1f
		'--color-error-900': '109 25 25', // #6d1919
		// surface | #2b2e40
		'--color-surface-50': '223 224 226', // #dfe0e2
		'--color-surface-100': '213 213 217', // #d5d5d9
		'--color-surface-200': '202 203 207', // #cacbcf
		'--color-surface-300': '170 171 179', // #aaabb3
		'--color-surface-400': '107 109 121', // #6b6d79
		'--color-surface-500': '43 46 64', // #2b2e40
		'--color-surface-600': '39 41 58', // #27293a
		'--color-surface-700': '32 35 48', // #202330
		'--color-surface-800': '26 28 38', // #1a1c26
		'--color-surface-900': '21 23 31' // #15171f
	}
};
