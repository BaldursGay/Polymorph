import { instances } from '$lib/stores/instance';
import { invoke } from '@tauri-apps/api';

export default async function refreshInstances(): Promise<void> {
	await invoke('get_instances', {})
		.then(async () => {
			await instances.updateInstances();
		})
		.catch((err: any) => console.error(err));
}
