import { invoke } from '@tauri-apps/api';
import { writable } from 'svelte/store';

import type { AppConfig } from '$lib/types/general.js';

function createAppConfig() {
	let dummy_var: AppConfig = {};
	const { subscribe, set, update } = writable(dummy_var);

	return {
		subscribe,
		updateConfig: async () => {
			await invoke('get_config_file_json', {}).then((res): void => {
				set(res as AppConfig);
			});
		}
	};
}

export const appConfig = createAppConfig();
