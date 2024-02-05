<script lang="ts">
	import type { SvelteComponent } from 'svelte';
	import { getModalStore, getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';

	export let parent: SvelteComponent;
	const modalStore = getModalStore();

	const toastStore = getToastStore();

	let instanceName: string;
	let formValid: boolean = true;

	const nameErrorToast: ToastSettings = {
		message: 'Invalid instance name!',
		hoverable: true,
		background: 'variant-soft-error'
	};

	function onFormSubmit(): void {
		if (instanceName !== undefined && instanceName !== '') {
			console.log(instanceName);
			modalStore.close();
		} else {
			formValid = false;
			toastStore.trigger(nameErrorToast);
			console.error('instance name invalid');
		}
	}
</script>

{#if $modalStore[0]}
	<div class="card p-4 w-modal shadow-xl space-y-4">
		<header class="text-2xl font-bold">Create Instance</header>
		<article>Create a new instance with a specified name.</article>
		<form class="p-2 space-y-4">
			<label class="label" for="instanceNameInput">
				<span>Name</span>
				<input
					class="input {formValid ? '' : 'input-error'} py-1.5 px-2"
					type="text"
					bind:value={instanceName}
					on:change={() => (formValid ? {} : (formValid = true))}
					placeholder="New Instance"
				/>
			</label>
		</form>
		<footer class={parent.regionFooter}>
			<button class="btn {parent.buttonNeutral}" on:click={parent.onClose}
				>{parent.buttonTextCancel}</button
			>
			<button class="btn {parent.buttonPositive}" on:click={onFormSubmit}
				>Create Instance</button
			>
		</footer>
	</div>
{/if}
