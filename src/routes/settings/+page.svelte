<script lang="ts">
	import { DirectoryInput } from '$lib/components/index.js';
	import { Brush, ChevronDown } from 'lucide-svelte';

	import { colorTheme } from '$lib/stores.js';

	let selectedTheme: string = $colorTheme;
</script>

<div class="flex flex-col space-y-4">
	<h1 class="page-title">Settings</h1>
	<div class="space-y-2">
		<label
			for="gamedir_input"
			class="flex text-lg place-items-center font-medium text-emphasized"
		>
			Game directory
			<div class="mx-2 text-paragraph opacity-30 text-sm">|</div>
			<span class="text-paragraph text-sm pt-[1px]"
				>Path to your Baldur's Gate 3 game directory</span
			>
		</label>
		<DirectoryInput
			dialog_text="Select your game directory"
			placeholder="C:\Users\Jade"
			input_id="gamedir_input"
			button_id="gamedir_button"
			autodetect
		/>
	</div>
	<div class="space-y-2">
		<label
			for="instancedir_input"
			class="flex text-lg place-items-center font-medium text-emphasized"
		>
			Instance Directory
			<div class="mx-2 text-paragraph opacity-30 text-sm">|</div>
			<span class="text-paragraph text-sm pt-[1px]"
				>Path to your instances folder (where instance files will be stored)</span
			>
		</label>
		<DirectoryInput
			dialog_text="Select your game directory"
			placeholder="C:\Users\Jade"
			input_id="instancedir_input"
			button_id="instancedir_button"
		/>
	</div>
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
			class="flex place-items-center bg-input border border-gray-600 border-opacity-45 h-10 rounded-md overflow-hidden"
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