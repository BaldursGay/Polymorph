import { instances } from '$lib/stores/instance';
import { invoke } from '@tauri-apps/api';

async function refreshInstances(): Promise<void> {
	await invoke('get_instances')
		.then(async () => {
			await instances.updateInstances();
		})
		.catch((err: any) => console.error(err));
}

async function openInstanceFolder(id: string): Promise<void> {
	await invoke('path_from_id', { id: id }).then(async (path) => {
		await invoke('open_from_path', { path: path as string });
	});
}

export { refreshInstances, openInstanceFolder };
