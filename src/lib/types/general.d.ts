export type AppConfig = {
	game_dir?: string;
	instances_dir?: string;
};

export type InstancesIndex = {
	instances: InstanceInfo[];
};

export type InstanceInfo = {
	name: string;
	description: string;
	id: string;
	order_index: number;
};
