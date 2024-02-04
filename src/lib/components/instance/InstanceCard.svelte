<script lang="ts">
	export let title: string;
	export let instanceId: string;

	import { FolderOpen, MoreHorizontal, Play } from 'lucide-svelte';
</script>

<div class="card card-hover flex justify-between place-items-center">
	<a class="text-lg font-semibold grow px-3 py-2" href="/instance/{instanceId}">{title}</a>
	<div class="flex gap-1 my-2 mr-2">
		<button
			class="btn-icon btn-icon-sm hover:variant-ghost-surface rounded-[12px] z-10"
			on:click={() => console.log('test')}><Play size="18" /></button
		>
		<button class="btn-icon btn-icon-sm hover:variant-ghost-surface rounded-[12px]"
			><FolderOpen size="18" /></button
		>
		<button class="btn-icon btn-icon-sm hover:variant-ghost-surface rounded-[12px]"
			><MoreHorizontal size="18" /></button
		>
	</div>
</div>
