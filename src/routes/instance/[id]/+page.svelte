<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { ArrowLeft, FolderOpen, HeartCrack, Play, Upload } from 'lucide-svelte';

	import placeholderIcon from '$lib/assets/placeholder/instance.png';
	import { invoke, tauri, dialog } from '@tauri-apps/api';
	import { openInstanceFolder } from '$lib/utils/instance';

	async function getIconSrc(id: string): Promise<string | null> {
		let instanceIconPath: string | null = null;

		await invoke('get_icon_path', { id: id }).then((res) => {
			instanceIconPath = res as string;
		});

		if (!instanceIconPath) return null;

		let res = tauri.convertFileSrc(instanceIconPath);

		return res;
	}

	async function openInstanceFolderHandler(): Promise<void> {
		await openInstanceFolder(data.instance.id);
	}

	async function handleFileUpload(): Promise<void> {
		let uploadedFiles = await dialog.open({
			title: $_('page.instance.action.button.add_mods.dialog_title'),
			multiple: true,
			filters: [
				{
					name: 'Mods',
					extensions: ['pak']
				}
			]
		});

		if (!uploadedFiles) return;

		for (let i = 0; i < uploadedFiles.length; i++) {
			console.log(uploadedFiles[i]);
		}
	}

	export let data;
</script>

<div class="flex flex-col grow h-full">
	<div class="card flex justify-between w-full p-2">
		<div class="flex gap-3.5 place-items-center">
			<div class="flex gap-2">
				<a class="btn-icon hover:variant-ghost-surface rounded-xl" href="/"><ArrowLeft /></a
				>
				{#await getIconSrc(data.instance.id)}
					<img
						class="rounded-xl shadow-lg w-[50px] h-[50px] object-cover"
						src={placeholderIcon}
						alt="instance icon"
					/>
				{:then imgSrc}
					<img
						class="rounded-xl shadow-lg w-[50px] h-[50px] object-cover"
						src={imgSrc || placeholderIcon}
						alt="instance icon"
					/>
				{/await}
			</div>
			<span class="text-2xl font-bold pb-1">{data.instance.name}</span>
		</div>
		<div class="flex gap-1">
			<button class="btn-icon rounded-xl hover:variant-ghost-surface"><Play /></button>
			<button
				class="btn-icon rounded-xl hover:variant-ghost-surface"
				on:click={openInstanceFolderHandler}><FolderOpen /></button
			>
		</div>
	</div>

	<div class="flex grow place-self-center">
		<div class="flex flex-col justify-center space-y-5">
			<div class="flex place-items-center gap-2.5">
				<HeartCrack class="mt-0.5" size="64" />
				<div class="flex flex-col gap-1">
					<h2 class="h2">
						<span class="font-bold">{$_('page.instance.no_mods')}</span>
					</h2>
					<p class="text-lg">{$_('page.instance.add_mods')}</p>
				</div>
			</div>
			<button class="btn variant-outline hover:variant-filled" on:click={handleFileUpload}>
				<Upload size="20" />
				<span>{$_('page.instance.action.button.add_mods.title')}</span>
			</button>
		</div>
	</div>
</div>
