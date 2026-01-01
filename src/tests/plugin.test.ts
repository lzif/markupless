import { describe, expect, it, mock, spyOn } from "bun:test";
import app, { type App } from "@/core/app";
import type { Plugin } from "@/core/plugin";

describe("Plugin System", () => {
	it("should register and install a plugin", () => {
		const myApp = app();
		const installSpy = mock();

		const myPlugin: Plugin = {
			name: "test-plugin",
			install: (application: App) => {
				installSpy(application);
			},
		};

		myApp.use(myPlugin);

		expect(installSpy).toHaveBeenCalledWith(myApp);
		expect(myApp.plugins.has("test-plugin")).toBe(true);
	});

	it("should warn if plugin is already installed", () => {
		const myApp = app();
		const consoleSpy = spyOn(console, "warn").mockImplementation(() => {});
		const installSpy = mock();

		const myPlugin: Plugin = {
			name: "test-plugin",
			install: installSpy,
		};

		myApp.use(myPlugin);
		myApp.use(myPlugin);

		expect(installSpy).toHaveBeenCalledTimes(1);
		expect(consoleSpy).toHaveBeenCalledWith(
			"Plugin test-plugin is already installed.",
		);

		consoleSpy.mockRestore();
	});
});
