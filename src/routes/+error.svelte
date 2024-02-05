<script lang="ts">
	import { page } from '$app/stores';
	import { _ } from 'svelte-i18n';

	import { ServerCrash } from 'lucide-svelte';
</script>

<div class="flex w-full h-full justify-center place-items-center">
	<div class="flex place-items-center gap-2.5">
		<ServerCrash size="64" />
		<div class="flex flex-col gap-1">
			<h2 class="h2">
				<span class="font-bold">{$page.status}:</span>
				{$page.error?.message}
			</h2>
			{#if $page.status === 404}
				<p class="text-lg">{$_('page.instance.error.404')}</p>
			{/if}
		</div>
	</div>
</div>
