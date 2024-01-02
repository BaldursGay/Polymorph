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
	<div class="w-1/2 bg-base oled:bg-raised shadow-2xl rounded-2xl overflow-hidden">
		<div
			class="flex justify-between place-items-center bg-raised oled:bg-base dark:bg-opacity-75"
		>
			<h1 class="text-xl font-semibold px-5 py-4">Create Instance</h1>
			<button class="btn-icon mr-3" on:click={() => (createInstanceModalOpen = false)}>
				<X />
			</button>
		</div>
		<div class="flex flex-col px-4 pt-2 pb-4 space-y-3">
			<div class="flex flex-col space-y-2">
				<label
					for="newinstance_title_input"
					class="flex text-xl place-items-center font-medium text-emphasized gap-1"
				>
					Name
					<span class="text-red-600">*</span>
				</label>
				<input
					id="newinstance_title_input"
					class="bg-input text-text h-10 grow px-3 focus:border-none focus:outline-none rounded-md"
					type="text"
					placeholder="My BG3 Instance..."
				/>
			</div>
			<div class="flex flex-col space-y-2">
				<label
					for="newinstance_description_input"
					class="flex text-xl place-items-center font-medium text-emphasized"
					>Description</label
				>
				<textarea
					id="newinstance_description_input"
					class="bg-input text-text h-32 grow px-3 py-2 focus:border-none focus:outline-none rounded-md resize-none"
					placeholder="A cool instance!"
				/>
			</div>
			<button
				class="
					flex grow justify-center gap-2 p-1.5 transition-all border scale-100 active:scale-[98%]
					bg-transparent border-btn-emphasized-outline hover:bg-btn-emphasized
					text-btn-emphasized-text hover:text-btn-emphasized-text-hover rounded-md
				"
			>
				<Plus />
				Create Instance
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
