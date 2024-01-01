import { SvelteComponent } from 'svelte';

export class DirectoryInput extends SvelteComponent<{
	dialog_text: string;
	placeholder: string;
	input_id: string | null | undefined;
	button_id: string | null | undefined;
	autodetect?: boolean;
}> {}

export class InstanceCard extends SvelteComponent<{
	title: string;
}> {}

export class Sidebar extends SvelteComponent<> {}
