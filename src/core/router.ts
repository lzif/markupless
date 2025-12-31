import { BaseElement } from "@/elements/base-element";

export type RouteHandler = BaseElement | (() => BaseElement);

export class Router {
	private routes: Map<string, RouteHandler> = new Map();
	private currentPath: string =
		typeof window !== "undefined" ? window.location.pathname : "/";
	private listeners: Function[] = [];

	constructor() {
		if (typeof window !== "undefined") {
			window.addEventListener("popstate", () => {
				this.currentPath = window.location.pathname;
				this.notify();
			});
		}
	}

	register(path: string, handler: RouteHandler) {
		this.routes.set(path, handler);
	}

	navigate(path: string) {
		if (typeof window !== "undefined") {
			window.history.pushState({}, "", path);
			this.currentPath = path;
			this.notify();
		}
	}

	resolve(): BaseElement | null {
		// Simple matching for now
		let handler = this.routes.get(this.currentPath);

		if (!handler) {
			// Try to find a wildcard route or 404
			// For now, let's just return null if exact match fails
			// Or maybe we can support simple parameters later.
			// Let's check for a fallback "*" route
			handler = this.routes.get("*");
		}

		if (!handler) return null;

		if (handler instanceof BaseElement) {
			return handler;
		}

		if (typeof handler === "function") {
			return (handler as () => BaseElement)();
		}

		return null;
	}

	subscribe(listener: Function) {
		this.listeners.push(listener);
	}

	private notify() {
		this.listeners.forEach((l) => l());
	}

	hasRoutes(): boolean {
		return this.routes.size > 0;
	}
}
