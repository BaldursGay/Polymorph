import { invoke } from '@tauri-apps/api';
import { writable } from 'svelte/store';

interface AppConfig {
	game_dir?: string;
	instances_dir?: string;
}

function createAppConfig() {
	let dummy_var: AppConfig = {};
	const { subscribe, set, update } = writable(dummy_var);

	return {
		subscribe,
		init: async () => {
			await invoke('get_config_file_json', {}).then((res: AppConfig) => {
				set(res);
			});
		}
	};
}

export const appConfig = createAppConfig();
