<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { ArrowLeft, HeartCrack, Play } from 'lucide-svelte';

	import placeholderIcon from '$lib/assets/placeholder/instance.png';

	export let data;
</script>

<div class="flex flex-col grow h-full">
	<div class="card flex justify-between w-full p-2">
		<div class="flex gap-3.5 place-items-center">
			<div class="flex gap-2">
				<a class="btn-icon hover:variant-ghost-surface rounded-xl" href="/"><ArrowLeft /></a
				>
				<img
					class="rounded-xl shadow-lg"
					width="50"
					src={placeholderIcon}
					alt="PLACEHOLDER!!! instance icon"
				/>
			</div>
			<span class="text-2xl font-bold pb-1">{data.instance.name}</span>
		</div>
		<div class="flex gap-1">
			<button class="btn-icon rounded-xl hover:variant-ghost-surface"><Play /></button>
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
