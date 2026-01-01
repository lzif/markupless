import {
	afterEach,
	beforeEach,
	describe,
	expect,
	it,
	mock,
	spyOn,
} from "bun:test";
import app, { type App } from "../core/app";
import { Router } from "../core/router";
import { BaseElement } from "../elements/base-element";

// We rely on happy-dom providing the global window/document
// setup-dom.ts should be loaded by bun test

describe("Router", () => {
	let router: Router;
	let pushStateSpy: any;

	beforeEach(() => {
		// Reset URL to root before creating router
		// In happy-dom, directly setting window.location.href or using history might work.
		// Let's rely on history API.
		window.history.replaceState({}, "", "/");

		pushStateSpy = spyOn(window.history, "pushState");

		router = new Router();
		// Force router to sync with current location just in case constructor read it wrong or before update
		// (Though constructor runs after replaceState, so it should be fine).
	});

	afterEach(() => {
		pushStateSpy.mockRestore();
	});

	it("should register routes", () => {
		const element = new BaseElement("div");
		router.register("/", element);
		expect(router.hasRoutes()).toBe(true);
	});

	it("should resolve registered routes", () => {
		const element = new BaseElement("div");
		router.register("/", element);

		// Debugging hint: print current path if needed
		// console.log("Router Path:", router['currentPath']);
		// console.log("Window Path:", window.location.pathname);

		// If this fails, it means router.currentPath !== "/"
		// Force navigation to ensure sync
		router.navigate("/");

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

		expect(pushStateSpy).toHaveBeenCalledWith({}, "", "/new-path");
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
	let root: HTMLElement;

	beforeEach(() => {
		// Reset URL
		window.history.replaceState({}, "", "/");

		// Setup a real root element in the DOM
		root = document.createElement("div");
		root.id = "app";
		document.body.appendChild(root);

		myApp = app("#app");
	});

	afterEach(() => {
		if (root?.parentNode) {
			root.parentNode.removeChild(root);
		}
	});

	it("should register routes via app.route()", () => {
		const element = new BaseElement("div");
		myApp.route("/home", element);
		expect(myApp.router.hasRoutes()).toBe(true);
	});

	it("should render matched route", () => {
		const element = new BaseElement("div");
		element.text("Home Page");

		// Force navigation to / to ensure router is in sync
		myApp.router.navigate("/");

		myApp.route("/", element);
		myApp.render();

		// Check if root has content
		expect(root.innerHTML).toContain("Home Page");
	});

	it("should update render on navigation", () => {
		const page1 = new BaseElement("h1").text("Page 1");
		const page2 = new BaseElement("h2").text("Page 2");

		myApp.router.navigate("/");
		myApp.route("/", page1);
		myApp.route("/page2", page2);

		myApp.render();
		expect(root.innerHTML).toContain("Page 1");

		// Simulate navigation
		myApp.router.navigate("/page2");

		expect(root.innerHTML).toContain("Page 2");
	});
});
