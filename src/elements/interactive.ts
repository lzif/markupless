import { BaseElement } from "./base-element";

/**
 * Base class for interactive elements like buttons and inputs.
 */
export class InteractiveElement extends BaseElement {
	constructor(tagName: string) {
		super(tagName);
	}
}

/**
 * Represents an `<input>` element.
 */
export class InputElement extends InteractiveElement {
	/**
	 * Creates a new InputElement.
	 * @param type - The input type (default "text").
	 */
	constructor(type: string = "text") {
		super("input");
		this.attr("type", type);
	}

	/**
	 * Sets the value attribute.
	 * @param val - The value.
	 */
	value(val: string): this {
		this.attr("value", val);
		return this;
	}

	/**
	 * Sets the placeholder text.
	 * @param text - The placeholder string.
	 */
	placeholder(text: string): this {
		this.attr("placeholder", text);
		return this;
	}

	/**
	 * Adds an input event listener.
	 * @param handler - Callback receiving the new value and the event.
	 */
	onInput(handler: (value: string, event: Event) => void): this {
		return this.on("input", (e) => {
			const target = e.target as HTMLInputElement;
			handler(target.value, e);
		});
	}
}

/**
 * Represents a `<button>` element.
 */
export class ButtonElement extends InteractiveElement {
	/**
	 * Creates a new ButtonElement.
	 * @param text - The button text.
	 */
	constructor(text?: string) {
		super("button");
		if (text) this.text(text);
	}

	/**
	 * Adds a click event listener.
	 * @param handler - Callback receiving the MouseEvent.
	 */
	onClick(handler: (event: MouseEvent) => void): this {
		return this.on("click", handler);
	}
}

/** Creates a `<button>` element. */
export const button = (text?: string) => new ButtonElement(text);
/** Creates an `<input>` element. */
export const input = (type: string = "text") => new InputElement(type);
/** Creates a `<textarea>` element. */
export const textarea = () => new InteractiveElement("textarea");
/** Creates a `<select>` element. */
export const select = () => new InteractiveElement("select");
/** Creates an `<option>` element. */
export const option = (text?: string, value?: string) => {
	const el = new InteractiveElement("option");
	if (text) el.text(text);
	if (value) el.attr("value", value);
	return el;
};
