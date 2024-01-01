<script lang="ts">
	import { Folder, FolderSearch, FolderOpen } from 'lucide-svelte';

	import { open } from '@tauri-apps/api/dialog';

	export let dialog_text: string = 'Select a directory';
	export let placeholder: string = '';
	export let input_id: string | null | undefined;
	export let button_id: string | null | undefined;
	export let autodetect: boolean | null | undefined;

	let chosen_directory = '';

	async function chooseDirectory() {
		const newDir = await open({
			multiple: false,
			directory: true,
			title: dialog_text
		});

		if (newDir != undefined) {
			chosen_directory = newDir?.toString() || '';
		}
	}
</script>

<div
	class="flex rounded-lg overflow-hidden h-10 bg-input border border-gray-600 border-opacity-45 {$$restProps.class ||
		''}"
>
	<div class="flex place-items-center btn-group-emphasized mr-1 px-2.5 m-0 h-full">
		<FolderOpen size="20" class="text-paragraph" />
	</div>
	<input
		type="text"
		class="bg-transparent text-text grow px-3 focus:border-none focus:outline-none"
		{placeholder}
		id={input_id}
		bind:value={chosen_directory}
	/>
	<button
		class="flex gap-2 place-items-center btn-group-emphasized hover:bg-group-emphasized-hover hover:bg-opacity-55 transition-all duration-200 text-text py-2 px-7"
		id={button_id}
		on:click={chooseDirectory}
	>
		<Folder size="20" />
		Browse
	</button>
	{#if autodetect}
		<button
			class="flex gap-2 place-items-center btn-group-emphasized hover:bg-group-emphasized-hover hover:bg-opacity-55 transition-all duration-200 text-text py-2 px-7 border-l border-gray-600 border-opacity-45"
			id={button_id}
		>
			<FolderSearch size="20" />
			Auto-detect
		</button>
	{/if}
</div>
