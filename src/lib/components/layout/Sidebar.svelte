<script lang="ts">
	import { getModalStore, type ModalSettings } from '@skeletonlabs/skeleton';
	import { LayoutGrid, Plus, Settings, X } from 'lucide-svelte';

	const modalStore = getModalStore();

	const modal: ModalSettings = {
		type: 'prompt',
		title: 'Create Instance',
		body: 'Create a new instance.',
		valueAttr: {
			type: 'text',
			minlength: 1,
			maxlength: 36,
			required: true
		},
		response: (response: string) => console.log('thingy!: ', response)
	};
</script>

<div class="flex flex-col justify-between h-full">
	<h1 class="text-2xl font-semibold p-2">BG3 Manager</h1>
	<nav class="list-nav grow">
		<ul class="h-full flex flex-col justify-between">
			<li>
				<a class="btn hover:variant-soft-primary justify-start gap-2" href="/">
					<LayoutGrid />
					Instances
				</a>
			</li>
			<li>
				<ul class="flex">
					<li class="grow">
						<a
							class="btn hover:variant-soft-primary w-full justify-start gap-2"
							href="/settings"
						>
							<Settings />
							Settings
						</a>
					</li>
					<li class="!m-0">
						<button
							class="btn-icon hover:variant-soft-primary rounded-[12px]"
							on:click={() => modalStore.trigger(modal)}
						>
							<span>
								<Plus size="22" />
							</span>
						</button>
					</li>
				</ul>
			</li>
		</ul>
	</nav>
</div>
