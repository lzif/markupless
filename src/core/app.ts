import { BaseElement } from "@/elements/base-element";
import { state, State } from "@/core/state";
import { Router, RouteHandler } from "@/core/router";
import { Plugin } from "@/core/plugin";

export class App {
	public root: HTMLElement | null = null;
	public components: BaseElement[] = [];
	public configOptions: { title?: string } = {};
	public _state: any = null;
	public _actions: any = {};
	public router: Router = new Router();
	public plugins: Set<string> = new Set();

	constructor(target?: string) {
		if (this.isBrowser && target) {
			const root: HTMLElement | null = document.querySelector(target);
			if (!root) throw new Error(`Root element ${target} not found`);
			this.root = root;
		}
	}

	public get isBrowser(): boolean {
		return typeof window !== "undefined" && typeof document !== "undefined";
	}

	public config(options: { title?: string }): this {
		this.configOptions = { ...this.configOptions, ...options };
		if (this.isBrowser && this.configOptions.title) {
			document.title = this.configOptions.title;
		}
		return this;
	}

	public setTitle(title: string): this {
		return this.config({ title });
	}

	public addStyle(style: string): this {
		if (this.isBrowser) {
			const styleEl = document.createElement("style");
			styleEl.textContent = style;
			document.head.appendChild(styleEl);
		}
		return this;
	}

	public state<T>(initialState: T): State<T> {
		return state(initialState);
	}

	public logic(logicFn: (state: any, actions: any) => any): this {
		// logicFn returns an object of actions
		this._actions = logicFn(this._state, this._actions);
		return this;
	}

	public add(component: BaseElement | BaseElement[]): this {
		if (Array.isArray(component)) {
			this.components.push(...component);
		} else {
			this.components.push(component);
		}
		return this;
	}

	// Alias for add, kept for backward compatibility if needed, or consistency with Element's .with()
	public with(component: BaseElement | BaseElement[]): this {
		return this.add(component);
	}

	public route(path: string, handler: RouteHandler): this {
		this.router.register(path, handler);
		return this;
	}

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
	 * @description Render the app
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
	 * @description Render the app to string (server-side rendering)
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

const app = (target?: string) => new App(target);

export default app;
