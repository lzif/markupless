import type { Plugin } from "@/core/plugin";
import { type RouteHandler, Router } from "@/core/router";
import { type State, state } from "@/core/state";
import type { BaseElement } from "@/elements/base-element";

/**
 * The core application class for the Markupless framework.
 * Orchestrates the rendering, routing, state management, and plugin integration.
 */
export class App {
	/** Reference to the root DOM element where the app is mounted */
	public root: HTMLElement | null = null;
	/** List of components registered to the app (for non-routed apps) */
	public components: BaseElement[] = [];
	/** Configuration options */
	public configOptions: { title?: string } = {};
	/** Internal state holder (deprecated/legacy usage) */
	public _state: any = null;
	/** Internal actions holder (deprecated/legacy usage) */
	public _actions: any = {};
	/** The router instance handling client-side navigation */
	public router: Router = new Router();
	/** Set of installed plugin names to prevent duplicates */
	public plugins: Set<string> = new Set();

	/**
	 * Creates a new App instance.
	 * @param target - The CSS selector for the root element (e.g., "#app").
	 */
	constructor(target?: string) {
		if (this.isBrowser && target) {
			const root: HTMLElement | null = document.querySelector(target);
			if (!root) throw new Error(`Root element ${target} not found`);
			this.root = root;
		}
	}

	/**
	 * Checks if the code is running in a browser environment.
	 */
	public get isBrowser(): boolean {
		return typeof window !== "undefined" && typeof document !== "undefined";
	}

	/**
	 * Configures global application settings.
	 * @param options - Configuration object (e.g., `{ title: "My App" }`).
	 * @returns The App instance for chaining.
	 * @example
	 * app().config({ title: "My Awesome App" });
	 */
	public config(options: { title?: string }): this {
		this.configOptions = { ...this.configOptions, ...options };
		if (this.isBrowser && this.configOptions.title) {
			document.title = this.configOptions.title;
		}
		return this;
	}

	/**
	 * Sets the document title.
	 * @param title - The new title string.
	 * @returns The App instance for chaining.
	 */
	public setTitle(title: string): this {
		return this.config({ title });
	}

	/**
	 * Injects a global CSS style string into the document head.
	 * @param style - The CSS string to inject.
	 * @returns The App instance for chaining.
	 */
	public addStyle(style: string): this {
		if (this.isBrowser) {
			const styleEl = document.createElement("style");
			styleEl.textContent = style;
			document.head.appendChild(styleEl);
		}
		return this;
	}

	/**
	 * Creates a reactive state object (legacy wrapper around `state()`).
	 * @param initialState - The initial value.
	 * @returns A reactive state proxy.
	 */
	public state<T>(initialState: T): State<T> {
		return state(initialState);
	}

	/**
	 * Defines application logic (deprecated pattern).
	 * @param logicFn - Function receiving state and actions.
	 * @returns The App instance for chaining.
	 */
	public logic(logicFn: (state: any, actions: any) => any): this {
		// logicFn returns an object of actions
		this._actions = logicFn(this._state, this._actions);
		return this;
	}

	/**
	 * Adds a component or list of components to the application.
	 * Used primarily when no routing is defined.
	 * @param component - A `BaseElement` or array of `BaseElement`s.
	 * @returns The App instance for chaining.
	 * @example
	 * app().add(div("Hello"));
	 */
	public add(component: BaseElement | BaseElement[]): this {
		if (Array.isArray(component)) {
			this.components.push(...component);
		} else {
			this.components.push(component);
		}
		return this;
	}

	/**
	 * Alias for `.add()`. Adds a component to the application.
	 * @param component - A `BaseElement` or array of `BaseElement`s.
	 * @returns The App instance for chaining.
	 */
	public with(component: BaseElement | BaseElement[]): this {
		return this.add(component);
	}

	/**
	 * Registers a route handler for a specific path.
	 * @param path - The URL path (e.g., "/home").
	 * @param handler - A `BaseElement` or a factory function returning one.
	 * @returns The App instance for chaining.
	 * @example
	 * app().route("/", () => div("Home Page"));
	 */
	public route(path: string, handler: RouteHandler): this {
		this.router.register(path, handler);
		return this;
	}

	/**
	 * Installs a plugin into the application.
	 * @param plugin - The plugin object implementing the `Plugin` interface.
	 * @returns The App instance for chaining.
	 */
	public use(plugin: Plugin): this {
		if (this.plugins.has(plugin.name)) {
			console.warn(`Plugin ${plugin.name} is already installed.`);
			return this;
		}
		plugin.install(this);
		this.plugins.add(plugin.name);
		return this;
	}

	/**
	 * Renders the application to the DOM.
	 * Must be called after configuration and setup.
	 * @returns The App instance.
	 * @throws Error if run outside the browser or if root element is missing.
	 */
	render() {
		if (!this.isBrowser) {
			throw new Error("Rendering is only supported in the browser");
		}

		if (!this.root) {
			throw new Error(
				"Root element is not set. Please provide a selector in the constructor.",
			);
		}

		if (this.router.hasRoutes()) {
			const renderRoute = () => {
				if (!this.root) return;
				this.root.innerHTML = "";
				const component = this.router.resolve();
				if (component) {
					this.root.appendChild(component.render());
				} else {
					// If no route matches and no fallback, maybe show components added via .add()?
					// But usually routing takes over.
					// Let's verify if we have components to fallback to?
					// For now, let's keep it simple: if routing is used, it controls the view.
				}
			};

			this.router.subscribe(renderRoute);
			renderRoute();
		} else {
			this.components.forEach((component) => {
				this.root?.appendChild(component.render());
			});
		}

		return this;
	}

	/**
	 * Renders the application to a string (Server-Side Rendering).
	 * @returns The HTML string representation of the app.
	 */
	renderToString(): string {
		// Check if routing is active
		if (this.router.hasRoutes()) {
			const component = this.router.resolve();
			return component ? component.renderToString() : "";
		}
		return this.components
			.map((component) => component.renderToString())
			.join("");
	}
}

let appInstance: App | null = null;

/**
 * Helper function to retrieve or create the App singleton.
 * @param target - The selector for the root element. If provided, a new App instance is created and set as the singleton.
 * @returns The App singleton instance.
 */
export const app = (target?: string) => {
	if (target) {
		appInstance = new App(target);
		return appInstance;
	}
	if (!appInstance) {
		appInstance = new App();
	}
	return appInstance;
};

export default app;
