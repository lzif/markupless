import { describe, it, expect } from "bun:test";
import { ul, ol, li, ListElement, ListItemElement } from "../list-element";

describe("List Elements", () => {
	it("should create unordered list", () => {
		const list = ul();
		expect(list).toBeInstanceOf(ListElement);
		expect(list.render().tagName.toLowerCase()).toBe("ul");
	});

	it("should create ordered list", () => {
		const list = ol();
		expect(list).toBeInstanceOf(ListElement);
		expect(list.render().tagName.toLowerCase()).toBe("ol");
	});

	it("should create list item", () => {
		const item = li("item 1");
		expect(item).toBeInstanceOf(ListItemElement);
		const dom = item.render();
		expect(dom.tagName.toLowerCase()).toBe("li");
		expect(dom.textContent).toBe("item 1");
	});

	it("should nest items", () => {
		const list = ul().add(li("one"), li("two"));
		const dom = list.render() as unknown as HTMLElement;
		expect(dom.children.length).toBe(2);
		expect(dom.children[0].textContent).toBe("one");
		expect(dom.children[1].textContent).toBe("two");
	});
});
