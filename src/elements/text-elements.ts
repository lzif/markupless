import { BaseElement } from "./base-element";
import { type State } from "@/core/state";
import { MagicArg } from "./types";

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

export type TextFactory = {
	(text: string): TextElement;
	(text: State<string | number>): TextElement;
	(attributes: Record<string, any>, text: string): TextElement;
	(...args: MagicArg[]): TextElement;
};

const createText =
	(tagName: string) =>
	(...args: any[]) =>
		new TextElement(tagName).applyMagic(args);

/** Creates an `<h1>` element. */
export const h1: TextFactory = createText("h1");
/** Creates an `<h2>` element. */
export const h2: TextFactory = createText("h2");
/** Creates an `<h3>` element. */
export const h3: TextFactory = createText("h3");
/** Creates an `<h4>` element. */
export const h4: TextFactory = createText("h4");
/** Creates an `<h5>` element. */
export const h5: TextFactory = createText("h5");
/** Creates an `<h6>` element. */
export const h6: TextFactory = createText("h6");
/** Creates a `<p>` element. */
export const p: TextFactory = createText("p");
/** Creates a `<span>` element. */
export const span: TextFactory = createText("span");
/** Creates a `<small>` element. */
export const small: TextFactory = createText("small");
/** Creates a `<strong>` element. */
export const strong: TextFactory = createText("strong");
/** Creates an `<em>` element. */
export const em: TextFactory = createText("em");
