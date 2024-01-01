<script lang="ts">
	import { LayoutGrid, Plus, Settings, X } from 'lucide-svelte';

	let createInstanceModalOpen = false;
</script>

<div
	class="
		absolute flex place-items-center place-content-center w-full h-full z-50 backdrop-blur-sm
		backdrop-brightness-90 oled:shadow-2xl
		transition-opacity {createInstanceModalOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}
	"
>
	<div class="w-1/2 h-96 bg-base oled:bg-raised shadow-2xl rounded-2xl overflow-hidden">
		<div
			class="flex justify-between place-items-center bg-raised oled:bg-base dark:bg-opacity-75"
		>
			<h1 class="text-xl font-semibold px-5 py-4">Create Instance</h1>
			<button class="btn-icon mr-3" on:click={() => (createInstanceModalOpen = false)}>
				<X />
			</button>
		</div>
	</div>
</div>

<div class="flex flex-col justify-between w-72 bg-raised pt-2 pb-3 px-3">
	<div>
		<h1 class="text-2xl font-medium text-emphasized ml-1 mb-4">BG3 Manager</h1>
		<div class="divider"></div>
		<a href="/" class="sidebar-item">
			<LayoutGrid />
			Instances
		</a>
	</div>
	<div class="flex gap-1">
		<a href="/settings" class="sidebar-item grow">
			<Settings />
			Settings
		</a>
		<button class="sidebar-item tooltip" on:click={() => (createInstanceModalOpen = true)}>
			<span class="tooltip-content">Create Instance</span>
			<Plus />
		</button>
	</div>
</div>
