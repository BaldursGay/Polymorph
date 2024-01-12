import { invoke } from '@tauri-apps/api';
import { writable } from 'svelte/store';

import type { InstancesIndex } from '$lib/types/general.js';

function createInstancesIndex() {
	let dummy: InstancesIndex = { instances: [] };
	const { subscribe, set } = writable(dummy);

	return {
		subscribe,
		updateIndex: async () => {
			await invoke('get_instances_index', {})
				.then((res: InstancesIndex) => {
					set(res);
				})
				.catch((err: string) => console.error(err));
		}
	};
}

export const instancesIndex = createInstancesIndex();
