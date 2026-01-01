import { BaseElement } from "./base-element";

/**
 * Represents a list container (`<ul>` or `<ol>`).
 */
export class ListElement extends BaseElement {}

/**
 * Represents a list item (`<li>`).
 */
export class ListItemElement extends BaseElement {
	constructor() {
		super("li");
	}
}

/** Creates a `<ul>` element. */
export const ul = (...args: any[]) => new ListElement("ul").applyMagic(args);
/** Creates an `<ol>` element. */
export const ol = (...args: any[]) => new ListElement("ol").applyMagic(args);
/** Creates an `<li>` element. */
export const li = (...args: any[]) => new ListItemElement().applyMagic(args);
