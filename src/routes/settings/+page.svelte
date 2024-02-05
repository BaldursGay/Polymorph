<script lang="ts">
	import { _ } from 'svelte-i18n';

	import { Brush, ChevronDown, Gamepad2 } from 'lucide-svelte';
	import { DirectoryInput } from '$lib/components/base/index.js';

	import { colorTheme } from '$lib/stores/theme.js';
	import { appConfig } from '$lib/stores/config.js';
	import { ListBox, ListBoxItem, popup, type PopupSettings } from '@skeletonlabs/skeleton';

	let gameVersion: 'dx11' | 'vulkan' = 'vulkan';

	const colorThemePopup: PopupSettings = {
		event: 'click',
		target: 'colorThemeCombobox',
		placement: 'bottom',
		closeQuery: '#colorThemeCombobox'
	};

	const gameVersionPopup: PopupSettings = {
		event: 'click',
		target: 'gameVersionCombobox',
		placement: 'bottom',
		closeQuery: '#gameVersionCombobox'
	};
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
	<label class="label relative">
		<span>Color Theme</span>
		<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
			<div class="input-group-shim">
				<Brush size="20" class="text-paragraph" />
			</div>
			<button class="btn hover:scale-100" use:popup={colorThemePopup} id="colorThemeCombobox">
				<span class="capitalize">{$colorTheme}</span>
				<span><ChevronDown size="20" /></span>
			</button>
		</div>
		<div class="card p-2 grow w-full z-10" data-popup="colorThemeCombobox">
			<ListBox active="variant-soft-primary">
				<ListBoxItem bind:group={$colorTheme} name="medium" value="auto">Auto</ListBoxItem>
				<ListBoxItem bind:group={$colorTheme} name="medium" value="light">Light</ListBoxItem
				>
				<ListBoxItem bind:group={$colorTheme} name="medium" value="dark">Dark</ListBoxItem>
			</ListBox>
		</div>
	</label>
	<label class="label relative">
		<span>Game Version</span>
		<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
			<div class="input-group-shim">
				<Gamepad2 size="20" class="text-paragraph" />
			</div>
			<button
				class="btn hover:scale-100"
				use:popup={gameVersionPopup}
				id="gameVersionCombobox"
			>
				<span class="capitalize">{$_(`game_version.${gameVersion}`)}</span>
				<span><ChevronDown size="20" /></span>
			</button>
		</div>
		<div class="card p-2 grow w-full z-10" data-popup="gameVersionCombobox">
			<ListBox active="variant-soft-primary">
				<ListBoxItem bind:group={gameVersion} name="medium" value="vulkan"
					>{$_('game_version.vulkan')}</ListBoxItem
				>
				<ListBoxItem bind:group={gameVersion} name="medium" value="dx11"
					>{$_('game_version.dx11')}</ListBoxItem
				>
			</ListBox>
		</div>
	</label>
</div>
