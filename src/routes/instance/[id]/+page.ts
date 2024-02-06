import { invoke } from '@tauri-apps/api/tauri';
import type { InstanceInfo } from '$lib/types/instance';

export const load: PageLoad = async ({ params }) => {
	let instance: InstanceInfo = {};

	await invoke('get_instance_info', { instanceId: params.id }).then((res) => (instance = res));

	return {
		instance: instance
	};
};
