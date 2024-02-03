<script lang="ts">
	import '../app.css';

	import { Sidebar } from '$lib/components/layout/index.js';
	import { AppShell } from '@skeletonlabs/skeleton';

	import { appWindow } from '@tauri-apps/api/window';

	import { colorTheme } from '$lib/stores/theme.js';

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

<div data-theme="main-theme" class="{selectedTheme} h-full">
	<div
		class="h-full text-surface-900 bg-surface-50 dark:text-surface-100 dark:bg-surface-900 transition-colors duration-500"
	>
		<!-- <div class="flex flex-row bg-base text-text h-screen w-screen">
			<Sidebar />
			<div class="p-6 w-full">
				<slot />
			</div>
		</div> -->
		<AppShell slotSidebarLeft="w-64 h-full p-2">
			<svelte:fragment slot="sidebarLeft">
				<Sidebar />
			</svelte:fragment>
			<slot />
		</AppShell>
	</div>
</div>
