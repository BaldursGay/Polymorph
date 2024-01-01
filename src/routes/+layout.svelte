<script lang="ts">
	import '../app.css';

	import { Sidebar } from '$lib/components/index.js';

	import { appWindow } from '@tauri-apps/api/window';

	import { colorTheme } from '$lib/stores.js';

	function getDeviceTheme(): string {
		let currentTheme: string = 'dark';

		appWindow.theme().then((theme) => {
			if (theme != undefined) {
				currentTheme = theme;
			}
		});

		return currentTheme;
	}

	function getTheme(value: string): string {
		if (value === 'auto') {
			return getDeviceTheme();
		} else {
			return $colorTheme;
		}
	}

	colorTheme.subscribe((value) => {
		selectedTheme = getTheme(value);
	});

	$: selectedTheme = getTheme($colorTheme);
</script>

<div data-theme={selectedTheme} class="transition-colors duration-300">
	<div class="flex flex-row bg-base text-text h-screen w-screen">
		<Sidebar />
		<div class="p-6 w-full">
			<slot />
		</div>
	</div>
</div>
