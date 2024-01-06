import { SvelteComponent } from 'svelte';
import type { DirectoryInputType } from '/types/components.js';

export class DirectoryInput extends SvelteComponent<{
	dialog_text: string;
	placeholder: string;
	input_id: string | null | undefined;
	button_id: string | null | undefined;
	autodetect?: boolean;
	chosenDirectory?: string | null | undefined;
	inputType: DirectoryInputType;
}> {}

export class InstanceCard extends SvelteComponent<{
	title: string;
}> {}

export class Sidebar extends SvelteComponent<> {}
