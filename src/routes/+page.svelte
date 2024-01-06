<script lang="ts">
	import { InstanceCard } from '$lib/components/index.js';
	import { appConfig } from '$lib/stores/config.js';

	import { FolderOpen } from 'lucide-svelte';
	import { invoke } from '@tauri-apps/api';

	function openInstancesFolder() {
		invoke('open_from_path', { path: $appConfig.instances_dir });
	}
</script>

<div class="space-y-4">
	<div class="flex justify-between space-x-3">
		<h1 class="page-title">Instances</h1>
		<button class="btn-icon" on:click={openInstancesFolder}>
			<FolderOpen class="text-text" />
		</button>
	</div>

	<div class="flex flex-col space-y-2">
		<InstanceCard title="Vanilla" />
		<InstanceCard title="Vanilla+" />
		<InstanceCard title="Heavily Modded" />
	</div>
</div>
