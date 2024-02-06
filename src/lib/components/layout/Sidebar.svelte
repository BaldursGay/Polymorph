<script lang="ts">
	import { _ } from 'svelte-i18n';

	import { getModalStore, type ModalComponent, type ModalSettings } from '@skeletonlabs/skeleton';
	import { LayoutGrid, Plus, Settings, X } from 'lucide-svelte';

	import { CreateInstanceModal } from '$lib/components/instance';

	const modalStore = getModalStore();
	const modalComponent: ModalComponent = { ref: CreateInstanceModal };

	const modal: ModalSettings = {
		type: 'component',
		component: modalComponent
	};
</script>

<div class="flex flex-col justify-between h-full gap-1.5">
	<h1 class="text-2xl font-semibold p-2">{$_('sidebar.title')}</h1>
	<nav class="list-nav grow">
		<ul class="h-full flex flex-col justify-between">
			<li>
				<a class="btn hover:variant-soft-primary justify-start gap-2" href="/">
					<LayoutGrid />
					{$_('sidebar.navigation.instances')}
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
							{$_('sidebar.navigation.settings')}
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
