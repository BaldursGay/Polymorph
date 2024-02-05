<script lang="ts">
	import { Brush, ChevronDown } from 'lucide-svelte';
	import { DirectoryInput } from '$lib/components/base/index.js';

	import { colorTheme } from '$lib/stores/theme.js';
	import { appConfig } from '$lib/stores/config.js';

	let selectedTheme: string = $colorTheme;
</script>

<div class="flex flex-col gap-3">
	<h1 class="text-2xl font-semibold">Settings</h1>
	<DirectoryInput
		label="Game Directory"
		dialog_text="Select your game directory"
		placeholder="C:\Users\Jade"
		chosenDirectory={$appConfig.game_dir === null || $appConfig.game_dir === undefined
			? null
			: $appConfig.game_dir}
		input_id="gamedir_input"
		button_id="gamedir_button"
		inputType="game_dir"
		autodetect
	/>
	<DirectoryInput
		label="Instance Directory"
		dialog_text="Select your game directory"
		placeholder="C:\Users\Jade"
		chosenDirectory={$appConfig.instances_dir === null || $appConfig.instances_dir === undefined
			? null
			: $appConfig.instances_dir}
		input_id="instancedir_input"
		button_id="instancedir_button"
		inputType="instances_dir"
		autodetect={false}
	/>
	<div class="space-y-2">
		<label
			for="colortheme_input"
			class="flex text-lg place-items-center font-medium text-emphasized"
		>
			Color Theme
			<div class="mx-2 text-paragraph opacity-30 text-sm">|</div>
			<span class="text-paragraph text-sm pt-[1px]">BG3 Manager app theme</span>
		</label>
		<div
			class="flex place-items-center bg-input border border-gray-600 border-opacity-45 h-10 rounded-lg overflow-hidden"
		>
			<div class="flex place-items-center btn-group-emphasized mr-2 px-2.5 m-0 h-full">
				<Brush size="20" class="text-paragraph" />
			</div>
			<select
				id="colortheme_input"
				class="flex w-full h-10 px-2 text-text bg-input focus:outline-none appearance-none"
				bind:value={selectedTheme}
				on:change={() => colorTheme.set(selectedTheme)}
			>
				<option value="auto">Auto</option>
				<option value="light">Light</option>
				<option value="dark">Dark</option>
				<option value="oled">OLED</option>
			</select>
			<ChevronDown class="mr-2" />
		</div>
	</div>
</div>
