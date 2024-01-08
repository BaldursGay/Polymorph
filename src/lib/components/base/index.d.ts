import { SvelteComponent } from 'svelte';
import type { DirectoryInputType } from '../../types/components.js';

export class DirectoryInput extends SvelteComponent<{
	dialog_text: string;
	placeholder: string;
	input_id: string | null;
	button_id: string | null;
	autodetect?: boolean | undefined;
	chosenDirectory?: string | null | undefined;
	inputType: DirectoryInputType;
}> {}

export class InstanceCard extends SvelteComponent<{
	title: string;
}> {}

export class LoadingButton extends SvelteComponent<{
	loading: boolean;
}> {}
