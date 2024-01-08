<script lang="ts">
	import { Folder, FolderOpen } from 'lucide-svelte';

	import { open } from '@tauri-apps/api/dialog';
	import { invoke } from '@tauri-apps/api';

	import { LoadingButton } from '$lib/components/base/index.js';

	import type { DirectoryInputType } from '$lib/types/components.js';
	import { appConfig } from '$lib/stores/config.js';

	export let dialog_text: string = 'Select a directory';
	export let placeholder: string = '';
	export let input_id: string | null;
	export let button_id: string | null;
	export let autodetect: boolean | undefined;
	export let inputType: DirectoryInputType;

	export let chosenDirectory: string | null | undefined = '';

	async function chooseDirectory() {
		const newDir = await open({
			multiple: false,
			directory: true,
			title: dialog_text
		});

		if (newDir != undefined) {
			chosenDirectory = newDir?.toString() || '';
		}
	}

	$: autodetectLoading = false;

	async function autodetectDirectory() {
		autodetectLoading = true;

		await invoke('autodetect_game_folder')
			.then(async () => {
				await appConfig.updateConfig().then(() => {
					autodetectLoading = false;
				});
			})
			.catch((err: any) => {
				console.log(`error! ${err}`);
				autodetectLoading = false;
			});
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
		bind:value={chosenDirectory}
		disabled
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
		<!-- <button
			class="flex gap-2 place-items-center btn-group-emphasized hover:bg-group-emphasized-hover hover:bg-opacity-55 transition-all duration-200 text-text py-2 px-7 border-l border-gray-600 border-opacity-45"
			id={button_id}
			on:click={autodetectDirectory}
		>
			<div class="flex gap-2 place-items-center">
				<div class="absolute -translate-x-7">
					{#if autodetectLoading}
						<div class="absolute" in:fade out:fade>
							<Circle size="20" color="white" />
						</div>
					{:else}
						<div class="absolute w-40" in:fade out:fade>
							<FolderSearch size="20" />
							Auto-detect
						</div>
					{/if}
				</div>
				<div class="invisible">Auto-detect</div>
			</div>
		</button> -->

		<LoadingButton on:click={autodetectDirectory} loading={autodetectLoading}
			>Auto-detect</LoadingButton
		>
	{/if}
</div>
