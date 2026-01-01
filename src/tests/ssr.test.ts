import { describe, expect, it } from "bun:test";
import app from "@/core/app";
import { BaseElement } from "@/elements/base-element";

// Mock BaseElement for testing
class MockElement extends BaseElement {
	constructor(tagName: string = "div") {
		super(tagName);
	}
}

describe("Server-Side Rendering (SSR)", () => {
	it("should render components to string", () => {
		const myApp = app();
		const element = new MockElement("div").text("Hello World");
		myApp.add(element);

		const html = myApp.renderToString();
		expect(html).toBe("<div>Hello World</div>");
	});

	it("should render nested components to string", () => {
		const myApp = app();
		const container = new MockElement("section");
		const child1 = new MockElement("h1").text("Title");
		const child2 = new MockElement("p").text("Content");

		container.with([child1, child2]);
		myApp.add(container);

		const html = myApp.renderToString();
		// Assuming implementation of BaseElement.renderToString handles children
		expect(html).toBe("<section><h1>Title</h1><p>Content</p></section>");
	});
});
