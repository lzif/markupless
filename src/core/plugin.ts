import { App } from "@/core/app";

/**
 * Interface for defining a plugin.
 */
export interface Plugin {
	/** Unique name of the plugin */
	name: string;
	/** Installation function called when `app.use()` is invoked */
	install: (app: App) => void;
}
