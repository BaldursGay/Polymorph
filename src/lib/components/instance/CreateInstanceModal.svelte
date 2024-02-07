<script lang="ts">
	import { _ } from 'svelte-i18n';

	import type { SvelteComponent } from 'svelte';
	import { invoke } from '@tauri-apps/api';
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

	let instanceIcon: string | undefined = undefined;
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
			invoke('create_instance', { instanceName: instanceName }).then(async () => {
				await refreshInstancesIndex();
				toastStore.trigger(createdInstanceToast);
			});

			modalStore.close();
		} else {
			formValid = false;
			toastStore.trigger(nameErrorToast);
		}
	}

	function handleReadFile(event: Event) {
		const target = event.target as HTMLInputElement;
		if (!target.files) {
			let noFilesToast: ToastSettings = {
				message: $_('modal.create_instance.toast.error.no_file'),
				hoverable: true,
				background: 'variant-soft-error'
			};
			toastStore.trigger(noFilesToast);
			return;
		}

		let image = target.files[0];

		console.log(image.type);
		if (!['image/png', 'image/jpg', 'image/jpeg'].includes(image.type)) {
			let invalidFileType: ToastSettings = {
				message: $_('modal.create_instance.toast.error.invalid_type'),
				hoverable: true,
				background: 'variant-soft-error'
			};
			toastStore.trigger(invalidFileType);
			return;
		}

		let fileReader = new FileReader();
		fileReader.readAsDataURL(image);
		fileReader.onload = (res) => {
			instanceIcon = res.target?.result?.toString();
		};
	}
</script>

{#if $modalStore[0]}
	<div class="card p-4 w-modal shadow-xl space-y-4">
		<header class="text-2xl font-bold">{$_('modal.create_instance.title')}</header>
		<article>{$_('modal.create_instance.description')}</article>
		<div class="flex gap-4">
			<img
				class="w-[145px] h-[145px] rounded-xl object-cover"
				src={instanceIcon ? instanceIcon : instanceIconPlaceholder}
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
				<FileButton
					name="instanceIconUploadButton"
					button="btn variant-ghost hover:variant-filled"
					width="w-full"
					accept=".png,.jpg,.jpeg"
					on:change={handleReadFile}
				>
					<Upload size="20" />
					<span>{$_('modal.create_instance.form.icon.label')}</span>
				</FileButton>
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
