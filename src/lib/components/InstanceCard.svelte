<script lang="ts">
	export let title: string;
	export let instanceId: string;

	import { FolderOpen, MoreHorizontal, Play } from 'lucide-svelte';
</script>

<div
	class="
		flex justify-between w-full h-14 place-items-center bg-raised
		rounded-lg shadow-sm dark:shadow-lg transition-transform scale-100 hover:scale-[1.005]
	"
>
	<a class="text-text grow p-3 pr-0" href="/instance/{instanceId}">{title}</a>
	<div class="flex pr-3">
		<button class="btn-icon tooltip">
			<span class="tooltip-content">Play</span>
			<Play size="20" />
		</button>
		<button class="btn-icon tooltip">
			<span class="tooltip-content">Open Instance Folder</span>
			<FolderOpen size="20" />
		</button>
		<button class="btn-icon tooltip">
			<span class="tooltip-content">More</span>
			<MoreHorizontal size="20" />
		</button>
	</div>
</div>
