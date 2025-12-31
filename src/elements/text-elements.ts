import { BaseElement } from "./base-element";

/**
 * Represents a generic text-containing element.
 */
export class TextElement extends BaseElement {
	/**
	 * Creates a new TextElement.
	 * @param tagName - The HTML tag name.
	 * @param text - Optional initial text content.
	 */
	constructor(tagName: string, text?: string) {
		super(tagName);
		if (text) {
			this.text(text);
		}
	}
}

/** Creates an `<h1>` element. */
export const h1 = (text?: string) => new TextElement("h1", text);
/** Creates an `<h2>` element. */
export const h2 = (text?: string) => new TextElement("h2", text);
/** Creates an `<h3>` element. */
export const h3 = (text?: string) => new TextElement("h3", text);
/** Creates an `<h4>` element. */
export const h4 = (text?: string) => new TextElement("h4", text);
/** Creates an `<h5>` element. */
export const h5 = (text?: string) => new TextElement("h5", text);
/** Creates an `<h6>` element. */
export const h6 = (text?: string) => new TextElement("h6", text);
/** Creates a `<p>` element. */
export const p = (text?: string) => new TextElement("p", text);
/** Creates a `<span>` element. */
export const span = (text?: string) => new TextElement("span", text);
/** Creates a `<small>` element. */
export const small = (text?: string) => new TextElement("small", text);
/** Creates a `<strong>` element. */
export const strong = (text?: string) => new TextElement("strong", text);
/** Creates an `<em>` element. */
export const em = (text?: string) => new TextElement("em", text);
