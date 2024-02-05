import { browser } from '$app/environment';
import { init, register } from 'svelte-i18n';

register('en', () => import('../../../locale/en.json'));

init({
	fallbackLocale: 'en',
	initialLocale: browser ? window.navigator.language : 'en'
});
