<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { ArrowLeft, HeartCrack, MoreHorizontal, Play } from 'lucide-svelte';

	export let data;
</script>

<div class="flex flex-col grow h-full">
	<div class="flex justify-between">
		<div class="card flex place-items-center gap-2 p-2 pr-6">
			<a class="btn-icon hover:variant-ghost-surface rounded-xl" href="/"><ArrowLeft /></a>
			<h1 class="text-xl font-semibold">{data.instance.name}</h1>
		</div>
		<div class="card flex place-items-center p-2">
			<button class="btn-icon rounded-xl hover:variant-ghost-surface"><Play /></button>
			<button class="btn-icon rounded-xl hover:variant-ghost-surface"
				><MoreHorizontal /></button
			>
		</div>
	</div>

	<div class="flex grow place-self-center place-items-center gap-2.5">
		<HeartCrack class="mt-0.5" size="64" />
		<div class="flex flex-col gap-1">
			<h2 class="h2">
				<span class="font-bold">{$_('page.instance.no_mods')}</span>
			</h2>
			<p class="text-lg">{$_('page.instance.add_mods')}</p>
		</div>
	</div>
</div>
