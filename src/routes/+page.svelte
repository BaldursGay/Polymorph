<script lang="ts">
	import { _ } from 'svelte-i18n';

	import { FolderOpen, RefreshCw, Swords } from 'lucide-svelte';
	import { invoke } from '@tauri-apps/api';

	import { InstanceCard } from '$lib/components/instance/index.js';

	import refreshInstances from '$lib/utils/instance';

	import { appConfig } from '$lib/stores/config.js';
	import { instances } from '$lib/stores/instance.js';

	function openInstancesFolder() {
		invoke('open_from_path', { path: $appConfig.instances_dir });
	}

	async function refreshHandler() {
		refreshing = true;
		await refreshInstances().then(() => (refreshing = false));
	}

	let refreshing = false;
</script>

<div class="flex flex-col grow w-full h-full">
	<div class="card flex justify-between place-items-center gap-3 p-2 pl-4">
		<h1 class="text-2xl font-bold">Instances</h1>
		<div class="flex gap-1">
			<button
				class="btn-icon hover:variant-soft-primary rounded-[12px]"
				on:click={refreshHandler}
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
		{#if $instances.length === 0}
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
				{#each $instances as { order_index, id, name }}
					<InstanceCard title={name} instanceId={id} />
				{/each}
			</div>
		{/if}
	</div>
</div>
