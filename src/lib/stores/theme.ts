import { persisted } from 'svelte-persisted-store';

export const colorTheme = persisted('colorTheme', 'auto');
