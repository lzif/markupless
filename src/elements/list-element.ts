import { BaseElement } from "./base-element";

export class ListElement extends BaseElement {
	constructor(tagName: "ul" | "ol") {
		super(tagName);
	}
}

export class ListItemElement extends BaseElement {
	constructor() {
		super("li");
	}
}

export const ul = () => new ListElement("ul");
export const ol = () => new ListElement("ol");
export const li = (text?: string) => {
	const el = new ListItemElement();
	if (text) el.text(text);
	return el;
};
