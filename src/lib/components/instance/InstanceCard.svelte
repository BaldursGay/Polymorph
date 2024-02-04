<script lang="ts">
	import { clipboard, popup, type PopupSettings } from '@skeletonlabs/skeleton';
	import { Check, Clipboard, FolderOpen, MoreHorizontal, Play } from 'lucide-svelte';

	export let title: string;
	export let instanceId: string;

	const popupSettings: PopupSettings = {
		event: 'click',
		target: `morePopup-${instanceId}`,
		placement: 'bottom'
	};

	let copied: boolean = false;
	function onCopyIdHandler(): void {
		copied = true;
		setTimeout(() => {
			copied = false;
		}, 1000);
	}
</script>

<div class="card p-2 z-20" data-popup="morePopup-{instanceId}">
	<nav class="list-nav">
		<ul>
			<li>
				<button class="flex gap-1" use:clipboard={instanceId} on:click={onCopyIdHandler}>
					{#if !copied}
						<Clipboard size="16" />
						Copy ID
					{:else}
						<Check size="16" />
						Copied!
					{/if}
				</button>
			</li>
		</ul>
	</nav>
</div>

<div class="card card-hover flex justify-between place-items-center">
	<a class="text-lg font-semibold grow px-3 py-2" href="/instance/{instanceId}">{title}</a>
	<div class="flex gap-1 my-2 mr-2">
		<button class="btn-icon btn-icon-sm hover:variant-ghost-surface rounded-[12px] z-10"
			><Play size="18" /></button
		>
		<button class="btn-icon btn-icon-sm hover:variant-ghost-surface rounded-[12px]"
			><FolderOpen size="18" /></button
		>
		<button
			class="btn-icon btn-icon-sm hover:variant-ghost-surface rounded-[12px]"
			use:popup={popupSettings}><MoreHorizontal size="18" /></button
		>
	</div>
</div>
