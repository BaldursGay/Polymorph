<script lang="ts">
	import { _ } from 'svelte-i18n';

	import { FolderOpen, RefreshCw, Swords } from 'lucide-svelte';
	import { invoke } from '@tauri-apps/api';

	import { InstanceCard } from '$lib/components/instance/index.js';

	import { appConfig } from '$lib/stores/config.js';
	import { instancesIndex } from '$lib/stores/instance.js';

	import refreshInstancesIndex from '$lib/utils/instance';

	function openInstancesFolder() {
		invoke('open_from_path', { path: $appConfig.instances_dir });
	}

	async function refreshInstancesIndexHandler() {
		refreshing = true;

		await refreshInstancesIndex().then(() => (refreshing = false));
	}

	let refreshing = false;
</script>

<div class="flex flex-col grow w-full h-full space-y-2">
	<div class="flex justify-between place-items-center gap-3">
		<h1 class="text-2xl font-semibold">Instances</h1>
		<div class="flex gap-1">
			<button
				class="btn-icon hover:variant-soft-primary rounded-[12px]"
				on:click={refreshInstancesIndexHandler}
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

	<div class="flex flex-col justify-center space-y-2 h-full">
		{#if $instancesIndex.instances.length === 0}
			<div class="flex place-self-center place-items-center gap-2.5">
				<Swords class="mt-0.5" size="64" />
				<div class="flex flex-col gap-1">
					<h2 class="h2">
						<span class="font-bold">{$_('page.instance.no_instances')}</span>
					</h2>
					<p class="text-lg">{$_('page.instance.create_an_instance')}</p>
				</div>
			</div>
		{:else}
			<div class="flex flex-col grow space-y-2.5">
				{#each $instancesIndex.instances as { order_index, id, name, description }}
					<InstanceCard title={name} instanceId={id} />
				{/each}
			</div>
		{/if}
	</div>
</div>
