<script lang="ts">
	import { _ } from 'svelte-i18n';

	import type { SvelteComponent } from 'svelte';
	import { invoke, tauri } from '@tauri-apps/api';
	import { open } from '@tauri-apps/api/dialog';
	import {
		FileButton,
		getModalStore,
		getToastStore,
		type ToastSettings
	} from '@skeletonlabs/skeleton';
	import { Upload } from 'lucide-svelte';

	import instanceIconPlaceholder from '$lib/assets/placeholder/instance.png';
	import refreshInstancesIndex from '$lib/utils/instance';

	export let parent: SvelteComponent;
	const modalStore = getModalStore();

	const toastStore = getToastStore();

	let instanceIcon: string | string[] | null | undefined = undefined;
	let instanceIconSrc: string | undefined = undefined;
	let instanceName: string;
	let formValid: boolean = true;

	const createdInstanceToast: ToastSettings = {
		message: $_('modal.create_instance.toast.success'),
		hoverable: true,
		background: 'variant-soft-success'
	};

	const nameErrorToast: ToastSettings = {
		message: $_('modal.create_instance.toast.error.invalid_name'),
		hoverable: true,
		background: 'variant-soft-error'
	};

	async function onFormSubmit(): Promise<void> {
		if (instanceName !== undefined && instanceName !== '') {
			invoke('create_instance', {
				instanceName: instanceName
				// iconPath: instanceIconSrc ? instanceIconSrc : null
			}).then(async () => {
				await refreshInstancesIndex();
				toastStore.trigger(createdInstanceToast);
			});

			modalStore.close();
		} else {
			formValid = false;
			toastStore.trigger(nameErrorToast);
		}
	}

	// modified from @modrinth/theseus:
	// https://github.com/modrinth/theseus/blob/3ff0ff238a4360960a8fee26d45094f92c8fefc5/theseus_gui/src/components/ui/InstanceCreationModal.vue#L383
	async function handleReadFile() {
		instanceIcon = await open({
			title: 'Select an instance image',
			multiple: false,
			filters: [
				{
					name: 'Image',
					extensions: ['png', 'jpg', 'jpeg', 'svg', 'webp', 'gif', 'jpg']
				}
			]
		});

		if (!instanceIcon) return;

		instanceIconSrc = tauri.convertFileSrc(instanceIcon.toString());
	}
</script>

{#if $modalStore[0]}
	<div class="card p-4 w-modal shadow-xl space-y-4">
		<header class="text-2xl font-bold">{$_('modal.create_instance.title')}</header>
		<article>{$_('modal.create_instance.description')}</article>
		<div class="flex gap-4">
			<img
				class="w-[145px] h-[145px] rounded-xl object-cover"
				src={instanceIconSrc || instanceIconPlaceholder}
				alt="Instance Icon"
			/>
			<form class="flex flex-col justify-center w-full gap-4">
				<label class="label w-full" for="instanceNameInput">
					<span>{$_('modal.create_instance.form.name.label')}</span>
					<input
						class="input {formValid ? '' : 'input-error'} py-1.5 px-2"
						type="text"
						bind:value={instanceName}
						on:change={() => (formValid ? {} : (formValid = true))}
						placeholder={$_('modal.create_instance.form.name.placeholder')}
						name="instanceNameInput"
					/>
				</label>
				<!-- <FileButton
					name="instanceIconUploadButton"
					button="btn variant-ghost hover:variant-filled"
					width="w-full"
					accept=".png,.jpg,.jpeg"
					on:change={handleReadFile}
				>
					<Upload size="20" />
					<span>{$_('modal.create_instance.form.icon.label')}</span>
				</FileButton> -->
				<button
					name="instanceIconUploadButton"
					class="btn variant-ghost hover:variant-filled"
					on:click={handleReadFile}
				>
					{$_('modal.create_instance.form.icon.label')}
				</button>
			</form>
		</div>
		<footer class={parent.regionFooter}>
			<button class="btn {parent.buttonNeutral}" on:click={parent.onClose}
				>{$_('modal.create_instance.action_row.cancel')}</button
			>
			<button class="btn {parent.buttonPositive}" on:click={onFormSubmit}
				>{$_('modal.create_instance.action_row.confirm')}</button
			>
		</footer>
	</div>
{/if}
