<script lang="ts">
	import refreshInstancesIndex from '$lib/utils/instance';
	import placeholderIcon from '$lib/assets/placeholder/instance.png';
	import {
		clipboard,
		getModalStore,
		popup,
		type ModalSettings,
		type PopupSettings,
		getToastStore,
		type ToastSettings
	} from '@skeletonlabs/skeleton';
	import { invoke } from '@tauri-apps/api';
	import { Check, Clipboard, FolderOpen, MoreHorizontal, Play, Trash2 } from 'lucide-svelte';

	export let title: string;
	export let instanceId: string;
	export let instanceIconPath: string | undefined = undefined;

	const toastStore = getToastStore();
	const confirmDeleteToast: ToastSettings = {
		message: `Deleted instance with ID: '${instanceId}'!`,
		hoverable: true,
		background: 'variant-soft-success'
	};

	const modalStore = getModalStore();
	const modalSettings: ModalSettings = {
		type: 'confirm',
		title: 'Delete Instance',
		body: 'Are you sure you want to delete this instance?',
		response: async (res) => {
			if (res) {
				await deleteInstanceHandler();
				toastStore.trigger(confirmDeleteToast);
			}
		}
	};

	const popupSettings: PopupSettings = {
		event: 'click',
		target: `morePopup-${instanceId}`,
		placement: 'bottom'
	};

	let copied: boolean = false;

	function onCopyIdHandler(): void {
		copied = true;
		setTimeout(() => {
			copied = false;
		}, 1000);
	}

	async function deleteInstanceHandler(): Promise<void> {
		invoke('delete_instance', { instanceId: instanceId }).then(
			async () => await refreshInstancesIndex()
		);
	}
</script>

<div class="card p-2 z-20" data-popup="morePopup-{instanceId}">
	<nav class="list-nav">
		<ul>
			<li>
				<button
					class="flex justify-center gap-1 w-full transition-colors"
					use:clipboard={instanceId}
					on:click={onCopyIdHandler}
				>
					{#if !copied}
						<Clipboard size="16" />
						Copy ID
					{:else}
						<Check size="16" />
						Copied!
					{/if}
				</button>
			</li>
			<li>
				<button
					class="flex justify-center gap-1 w-full variant-soft-error hover:!variant-ghost-error transition-colors"
					on:click={() => modalStore.trigger(modalSettings)}
				>
					<Trash2 size="16" />
					Delete
				</button>
			</li>
		</ul>
	</nav>
</div>

<div class="card card-hover flex justify-between place-items-center">
	<a class="flex grow p-2 gap-3" href="/instance/{instanceId}">
		<img
			class="rounded-lg"
			width="75"
			src={instanceIconPath || placeholderIcon}
			alt={instanceIconPath ? `Instance '${title}' icon` : 'Generic instance icon'}
		/>
		<span class="text-lg font-semibold">{title}</span>
	</a>
	<div class="flex place-self-start gap-1 my-2 mr-2">
		<button class="btn-icon hover:variant-ghost-surface rounded-[12px] z-10"
			><Play size="18" /></button
		>
		<button class="btn-icon hover:variant-ghost-surface rounded-[12px]"
			><FolderOpen size="18" /></button
		>
		<button
			class="btn-icon hover:variant-ghost-surface rounded-[12px]"
			use:popup={popupSettings}><MoreHorizontal size="18" /></button
		>
	</div>
</div>
