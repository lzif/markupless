import { App } from "@/core/app";

export interface Plugin {
	name: string;
	install: (app: App) => void;
}
