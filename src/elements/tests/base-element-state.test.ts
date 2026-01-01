import { describe, it, expect } from "bun:test";
import { BaseElement } from "../base-element";
import { state } from "../../core/state";

describe("BaseElement State Binding", () => {
	it("should update text content when state changes", () => {
		// Determine if we are in a browser environment (Vitest with happy-dom should simulate this)
		const isBrowser =
			typeof window !== "undefined" && typeof document !== "undefined";

		if (!isBrowser) {
			console.warn("Skipping browser-dependent test");
			return;
		}

		const count = state(0);
		const element = new BaseElement("div");

		element.text(count);

		const domEl = element.render();
		expect(domEl.textContent).toBe("0");

		count.value++;
		expect(domEl.textContent).toBe("1");

		count.value = 10;
		expect(domEl.textContent).toBe("10");
	});

	it("should update text content when getter function changes", () => {
		const isBrowser =
			typeof window !== "undefined" && typeof document !== "undefined";
		if (!isBrowser) return;

		const firstName = state("John");
		const lastName = state("Doe");

		const element = new BaseElement("p");
		element.text(() => `${firstName.value} ${lastName.value}`);

		const domEl = element.render();
		expect(domEl.textContent).toBe("John Doe");

		firstName.value = "Jane";
		expect(domEl.textContent).toBe("Jane Doe");
	});
});
