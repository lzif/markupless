import { describe, it, expect, mock, beforeEach } from "bun:test";
import { Router } from "../core/router";
import { BaseElement } from "../elements/base-element";
import app, { App } from "../core/app";

// Mock window and history
const mockPushState = mock();
const mockAddEventListener = mock();

// @ts-ignore
global.window = {
	location: { pathname: "/" },
	history: { pushState: mockPushState },
	addEventListener: mockAddEventListener,
	removeEventListener: mock(),
};

// @ts-ignore
global.document = {
	createElement: (tag: string) => {
		return {
			tagName: tag.toUpperCase(),
			setAttribute: mock(),
			appendChild: mock(),
			addEventListener: mock(),
			style: {},
		};
	},
	querySelector: mock(),
	head: { appendChild: mock() },
	createDocumentFragment: () => ({ appendChild: mock() }),
};

describe("Router", () => {
	let router: Router;

	beforeEach(() => {
		router = new Router();
		mockPushState.mockClear();
		mockAddEventListener.mockClear();
		// Reset window.location.pathname
		(window.location as any).pathname = "/";
	});

	it("should register routes", () => {
		const element = new BaseElement("div");
		router.register("/", element);
		expect(router.hasRoutes()).toBe(true);
	});

	it("should resolve registered routes", () => {
		const element = new BaseElement("div");
		router.register("/", element);
		expect(router.resolve()).toBe(element);
	});

	it("should resolve factory functions", () => {
		const element = new BaseElement("div");
		router.register("/factory", () => element);

		router.navigate("/factory");
		expect(router.resolve()).toBe(element);
	});

	it("should navigate and notify listeners", () => {
		const listener = mock();
		router.subscribe(listener);

		router.navigate("/new-path");

		expect(mockPushState).toHaveBeenCalledWith({}, "", "/new-path");
		expect(listener).toHaveBeenCalled();
	});

	it("should return null for unknown routes", () => {
		router.navigate("/unknown");
		expect(router.resolve()).toBeNull();
	});

	it("should support wildcard fallback", () => {
		const fallback = new BaseElement("div");
		router.register("*", fallback);
		router.navigate("/unknown");
		expect(router.resolve()).toBe(fallback);
	});
});

describe("App Routing", () => {
	let myApp: App;
	let root: any;

	beforeEach(() => {
		root = {
			innerHTML: "",
			appendChild: mock(),
		};
		// Mock document.querySelector to return our root
		(document.querySelector as any) = mock().mockReturnValue(root);
		myApp = app("#app");
	});

	it("should register routes via app.route()", () => {
		const element = new BaseElement("div");
		myApp.route("/home", element);
		expect(myApp.router.hasRoutes()).toBe(true);
	});

	it("should render matched route", () => {
		const element = new BaseElement("div");
		// Mock render to return something we can verify
		const domElement = { tagName: "DIV" };
		element.render = mock().mockReturnValue(domElement);

		myApp.route("/", element);
		myApp.render();

		expect(element.render).toHaveBeenCalled();
		expect(root.appendChild).toHaveBeenCalledWith(domElement);
	});

	it("should update render on navigation", () => {
		const page1 = new BaseElement("h1");
		const page2 = new BaseElement("h2");

		page1.render = mock().mockReturnValue({ tagName: "H1" });
		page2.render = mock().mockReturnValue({ tagName: "H2" });

		myApp.route("/", page1);
		myApp.route("/page2", page2);

		myApp.render();
		expect(root.appendChild).toHaveBeenCalledWith({ tagName: "H1" });

		// Simulate navigation
		myApp.router.navigate("/page2");

		// root.innerHTML = "" should have been called, but we can't easily check assignment on mock object
		// unless we used a proxy or setter mock. But we can check appendChild called with new element
		expect(page2.render).toHaveBeenCalled();
		expect(root.appendChild).toHaveBeenCalledWith({ tagName: "H2" });
	});
});
