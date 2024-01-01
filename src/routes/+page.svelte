<script lang="ts">
	import { InstanceCard } from '$lib/components/index.js';

	import { FolderOpen } from 'lucide-svelte';
</script>

<div class="space-y-4">
	<div class="flex justify-between space-x-3">
		<h1 class="page-title">Instances</h1>
		<button class="btn-icon">
			<FolderOpen class="text-text" />
		</button>
	</div>

	<div class="flex flex-col space-y-2">
		<InstanceCard title="Vanilla" />
		<InstanceCard title="Vanilla+" />
		<InstanceCard title="Heavily Modded" />
	</div>
</div>
