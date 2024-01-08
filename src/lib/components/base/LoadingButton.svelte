<script lang="ts">
	import { Loader2 } from 'lucide-svelte';

	import { fade } from 'svelte/transition';

	export let loading: boolean = false;
</script>

<button
	on:click
	class="flex relative gap-2 place-items-center btn-group-emphasized hover:bg-group-emphasized-hover hover:bg-opacity-55 transition-all duration-200 text-text py-2 px-7 border-l border-gray-600 border-opacity-45"
	disabled={loading}
>
	{#if loading}
		<div
			class="absolute flex justify-center place-items-center -translate-x-1/2 left-[50%] w-full h-full backdrop-brightness-50 backdrop-blur-[0.085rem]"
			transition:fade={{ duration: 200 }}
		>
			<Loader2 class="animate-spin" />
		</div>
	{/if}
	<div>
		<slot />
	</div>
</button>
