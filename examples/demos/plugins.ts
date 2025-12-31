import { Plugin, App } from "../../src";

export const LoggerPlugin: Plugin = {
	name: "LoggerPlugin",
	install: (app: App) => {
		console.log("Logger Plugin Installed!");
		// We can hook into things here if the app exposes hooks.
		// For now, we just demonstrate installation.
		app.config({ title: "Markupless App (Plugin Active)" });
	},
};
