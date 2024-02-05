<script lang="ts">
	import { Folder, FolderOpen } from 'lucide-svelte';

	import { open } from '@tauri-apps/api/dialog';
	import { invoke } from '@tauri-apps/api';

	import type { DirectoryInputType } from '$lib/types/components.js';
	import { appConfig } from '$lib/stores/config.js';

	export let dialog_text: string = 'Select a directory';
	export let placeholder: string = '';
	export let input_id: string | null;
	export let button_id: string | null;
	export let inputType: DirectoryInputType;
	export let label: string;

	export let chosenDirectory: string | null | undefined = '';

	async function chooseDirectory() {
		const newDir = await open({
			multiple: false,
			directory: true,
			title: dialog_text
		});

		if (newDir != undefined) {
			chosenDirectory = newDir?.toString() || '';

			if (inputType === 'game_dir') {
				await invoke('set_game_directory', { path: newDir.toString() })
					.then(() => appConfig.updateConfig())
					.catch((e: any) => console.error(e));
			} else {
				await invoke('set_instances_directory', { path: newDir.toString() })
					.then(() => appConfig.updateConfig())
					.catch((e: any) => console.error(e));
			}
		}
	}
</script>

<label class="label">
	<span>{label}</span>
	<div
		class="input-group input-group-divider grid-cols-[auto_1fr_auto] {$$restProps.class || ''}"
	>
		<div class="input-group-shim">
			<FolderOpen size="20" class="text-paragraph" />
		</div>
		<input
			type="text"
			class="p-2"
			{placeholder}
			id={input_id}
			bind:value={chosenDirectory}
			readonly
		/>
		<button
			class="input-group-shim hover:variant-soft-primary transition-colors gap-1.5"
			id={button_id}
			on:click={chooseDirectory}
		>
			<Folder size="20" />
			Browse
		</button>
	</div>
</label>
