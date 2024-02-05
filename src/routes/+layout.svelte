<script lang="ts">
	import '../app.css';

	import { appWindow } from '@tauri-apps/api/window';

	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
	import { Toast, initializeStores, storePopup } from '@skeletonlabs/skeleton';

	import { AppShell, Modal } from '@skeletonlabs/skeleton';

	import { Sidebar } from '$lib/components/layout/index.js';

	import { colorTheme } from '$lib/stores/theme.js';

	initializeStores();
	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

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
		<Toast position="br" zIndex="z-[1000]" />
		<Modal />
		<AppShell
			slotSidebarLeft="w-64 h-full p-2 bg-surface-500/10 dark:bg-surface-500/25 rounded-r-lg"
			slotPageContent="p-4"
		>
			<svelte:fragment slot="sidebarLeft">
				<Sidebar />
			</svelte:fragment>
			<slot />
		</AppShell>
	</div>
</div>
