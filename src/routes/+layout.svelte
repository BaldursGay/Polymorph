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
		class="p-2.5 h-full text-surface-900 bg-surface-50 dark:text-surface-100 dark:bg-surface-900 transition-colors duration-500"
	>
		<Toast position="br" zIndex="z-[1000]" />
		<Modal />
		<AppShell
			slotSidebarLeft="w-64 py-1 px-2 card dark:shadow-xl"
			slotPageContent="pl-3.5 pr-1"
		>
			<svelte:fragment slot="sidebarLeft">
				<Sidebar />
			</svelte:fragment>
			<slot />
		</AppShell>
	</div>
</div>
