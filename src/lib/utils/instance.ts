import { instancesIndex } from '$lib/stores/instance';
import { invoke } from '@tauri-apps/api';

export default async function refreshInstancesIndex(): Promise<void> {
	await invoke('refresh_instances_index', {})
		.then(async () => {
			await instancesIndex.updateIndex();
		})
		.catch((err: any) => console.error(err));
}
