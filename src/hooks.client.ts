import { appConfig } from '$lib/stores/config.js';
import { instancesIndex } from '$lib/stores/instance.js';

await appConfig.updateConfig();
await instancesIndex.updateIndex();
