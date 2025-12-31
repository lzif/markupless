import { BaseElement } from "./base-element";

/**
 * Represents a list container (`<ul>` or `<ol>`).
 */
export class ListElement extends BaseElement {
	constructor(tagName: "ul" | "ol") {
		super(tagName);
	}
}

/**
 * Represents a list item (`<li>`).
 */
export class ListItemElement extends BaseElement {
	constructor() {
		super("li");
	}
}

/** Creates a `<ul>` element. */
export const ul = () => new ListElement("ul");
/** Creates an `<ol>` element. */
export const ol = () => new ListElement("ol");
/** Creates an `<li>` element. */
export const li = (text?: string) => {
	const el = new ListItemElement();
	if (text) el.text(text);
	return el;
};
