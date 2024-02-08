import { invoke } from '@tauri-apps/api';
import { writable } from 'svelte/store';

import type { InstanceInfo } from '$lib/types/instance';

function getInstances() {
	let dummy: InstanceInfo[] = [];
	const { subscribe, set } = writable(dummy);

	return {
		subscribe,
		updateInstances: async () => {
			await invoke('get_instances', {})
				.then((value: InstanceInfo[]) => {
					set(value);
				})
				.catch((err: string) => console.error(err));
		}
	};
}

export const instances = getInstances();
