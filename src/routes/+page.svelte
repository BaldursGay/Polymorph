<script lang="ts">
	import { InstanceCard } from '$lib/components/base/index.js';
	import { appConfig } from '$lib/stores/config.js';
	import { instancesIndex } from '$lib/stores/instance.js';

	import { FolderOpen, RefreshCw } from 'lucide-svelte';
	import { invoke } from '@tauri-apps/api';

	function openInstancesFolder() {
		invoke('open_from_path', { path: $appConfig.instances_dir });
	}

	async function refreshInstancesIndex() {
		refreshing = true;

		await invoke('refresh_instances_index', {})
			.then(async () => {
				// await instancesIndex.updateIndex().then(() => (refreshing = false));
			})
			.catch((err: any) => console.error(err));

		console.log($instancesIndex);
	}

	let refreshing = false;
</script>

<div class="space-y-4">
	<div class="flex justify-between space-x-3">
		<h1 class="page-title">Instances</h1>
		<div class="flex">
			<button class="btn-icon" on:click={refreshInstancesIndex}>
				<RefreshCw class="text-text {refreshing ? 'animate-spin' : ''}" />
			</button>
			<button class="btn-icon" on:click={openInstancesFolder}>
				<FolderOpen class="text-text" />
			</button>
		</div>
	</div>

	<div class="flex flex-col space-y-2">
		{#if $instancesIndex.instances.length === 0}
			<p>No instances!</p>
		{:else}
			{#each $instancesIndex.instances as { order_index, id, name, description }}
				<InstanceCard title={name} instanceId={id} />
			{/each}
		{/if}
		<!-- <InstanceCard title="Vanilla" instanceId="aegpaeign" />
		<InstanceCard title="Vanilla+" instanceId="aegpaeign" />
		<InstanceCard title="Heavily Modded" instanceId="aegpaeign" /> -->
	</div>
</div>
