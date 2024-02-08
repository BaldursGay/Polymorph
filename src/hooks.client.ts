import { appConfig } from '$lib/stores/config.js';
import { instances } from '$lib/stores/instance';

await instances.updateInstances();
