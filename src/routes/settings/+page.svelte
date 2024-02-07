<script lang="ts">
	import { _ } from 'svelte-i18n';

	import { Brush, ChevronDown, Gamepad2 } from 'lucide-svelte';
	import { DirectoryInput } from '$lib/components/base/index.js';

	import { colorTheme } from '$lib/stores/theme.js';
	import { appConfig } from '$lib/stores/config.js';
	import {
		ListBox,
		ListBoxItem,
		popup,
		SlideToggle,
		type PopupSettings
	} from '@skeletonlabs/skeleton';
	import { getName, getTauriVersion, getVersion } from '@tauri-apps/api/app';

	let gameVersion: 'dx11' | 'vulkan' = 'vulkan';
	let skipLauncher: boolean = false;
	let useSteam: boolean = false;

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

	async function getAppName() {
		let name: string = '';
		return await getName();
	}
</script>

<div class="flex flex-col grow gap-3">
	<div class="card flex justify-between place-items-center p-2 pl-4">
		<h1 class="text-2xl font-bold">{$_('page.settings.title')}</h1>
		<button class="btn hover:variant-soft-primary"
			>{$_('page.settings.action.auto_detect')}</button
		>
	</div>
	<div class="card p-4 space-y-3">
		<h2 class="text-xl font-semibold">{$_('page.settings.launcher_settings')}</h2>
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
			chosenDirectory={$appConfig.instances_dir === null ||
			$appConfig.instances_dir === undefined
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
				<button
					class="btn hover:scale-100"
					use:popup={colorThemePopup}
					id="colorThemeCombobox"
				>
					<span class="capitalize">{$colorTheme}</span>
					<span><ChevronDown size="20" /></span>
				</button>
			</div>
			<div class="card p-2 grow w-full z-10" data-popup="colorThemeCombobox">
				<ListBox active="variant-soft-primary">
					<ListBoxItem bind:group={$colorTheme} name="medium" value="auto"
						>Auto</ListBoxItem
					>
					<ListBoxItem bind:group={$colorTheme} name="medium" value="light"
						>Light</ListBoxItem
					>
					<ListBoxItem bind:group={$colorTheme} name="medium" value="dark"
						>Dark</ListBoxItem
					>
				</ListBox>
			</div>
		</label>
	</div>
	<div class="card p-4 space-y-3">
		<h2 class="text-xl font-semibold">{$_('page.settings.game_settings')}</h2>
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
					<span>{$_(`settings.game_version.${gameVersion}`)}</span>
					<span><ChevronDown size="20" /></span>
				</button>
			</div>
			<div class="card p-2 grow w-full z-10" data-popup="gameVersionCombobox">
				<ListBox active="variant-soft-primary">
					<ListBoxItem bind:group={gameVersion} name="medium" value="vulkan"
						>{$_('settings.game_version.vulkan')}</ListBoxItem
					>
					<ListBoxItem bind:group={gameVersion} name="medium" value="dx11"
						>{$_('settings.game_version.dx11')}</ListBoxItem
					>
				</ListBox>
			</div>
		</label>
		<label
			class="label flex justify-between place-items-center mt-1"
			for="skip-launcher-toggle"
		>
			<span class="font-semibold">{$_('settings.skip_launcher')}</span>
			<SlideToggle
				name="skip-launcher-toggle"
				active="bg-primary-500"
				bind:checked={skipLauncher}
			/>
		</label>
		<label class="label flex justify-between place-items-center mt-1" for="use-steam-toggle">
			<span class="font-semibold">{$_('settings.use_steam')}</span>
			<SlideToggle name="use-steam-toggle" active="bg-primary-500" bind:checked={useSteam} />
		</label>
	</div>
	<div class="card p-4 space-y-3">
		<h2 class="text-xl font-semibold">{$_('page.settings.about.title')}</h2>
		<div class="flex gap-2">
			<span class="font-semibold">{$_('page.settings.about.app_version')}:</span>
			<span>
				{#await getVersion() then res}
					v{res}
				{/await}
			</span>
		</div>
		<div class="flex gap-2">
			<span class="font-semibold">{$_('page.settings.about.tauri_version')}:</span>
			<span>
				{#await getTauriVersion() then res}
					v{res}
				{/await}
			</span>
		</div>
	</div>
</div>
