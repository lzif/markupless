import { BaseElement } from "@/elements/base-element";

/**
 * Type definition for a route handler.
 * Can be a BaseElement instance or a function returning one.
 */
export type RouteHandler = BaseElement | (() => BaseElement);

/**
 * Manages client-side routing using the History API.
 */
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

	/**
	 * Registers a route.
	 * @param path - The URL path to match.
	 * @param handler - The component or factory function to render.
	 */
	register(path: string, handler: RouteHandler) {
		this.routes.set(path, handler);
	}

	/**
	 * Navigates to a new path programmatically.
	 * @param path - The destination path.
	 */
	navigate(path: string) {
		if (typeof window !== "undefined") {
			window.history.pushState({}, "", path);
			this.currentPath = path;
			this.notify();
		}
	}

	/**
	 * Resolves the current route to a component.
	 * @returns The matching BaseElement or null if not found.
	 */
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

	/**
	 * Subscribes a listener to route changes.
	 * @param listener - Function to call on route change.
	 */
	subscribe(listener: Function) {
		this.listeners.push(listener);
	}

	private notify() {
		this.listeners.forEach((l) => l());
	}

	/**
	 * Checks if any routes have been registered.
	 * @returns True if routes exist.
	 */
	hasRoutes(): boolean {
		return this.routes.size > 0;
	}
}
