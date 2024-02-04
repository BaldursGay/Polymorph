<script lang="ts">
	import { InstanceCard } from '$lib/components/instance/index.js';
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
				await instancesIndex.updateIndex().then(() => (refreshing = false));
			})
			.catch((err: any) => console.error(err));

		console.log($instancesIndex);
	}

	let refreshing = false;
</script>

<div class="space-y-4">
	<div class="flex justify-between place-items-center gap-3">
		<h1 class="text-2xl font-semibold">Instances</h1>
		<div class="flex gap-1">
			<button
				class="btn-icon hover:variant-soft-primary rounded-[12px]"
				on:click={refreshInstancesIndex}
			>
				<RefreshCw class="text-text {refreshing ? 'animate-spin' : ''}" />
			</button>
			<button
				class="btn-icon hover:variant-soft-primary rounded-[12px]"
				on:click={openInstancesFolder}
			>
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
	</div>
</div>
