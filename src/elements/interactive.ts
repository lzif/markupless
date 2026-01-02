import { BaseElement } from "./base-element";

/**
 * Base class for interactive elements like buttons and inputs.
 */
export class InteractiveElement extends BaseElement {}

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
export const button = (...args: any[]) => new ButtonElement().applyMagic(args);
/** Creates an `<input>` element. */
export const input = (...args: any[]) => {
	// If the first argument is a string and it looks like an input type, we might want to preserve that behavior.
	// However, the new magic system suggests strings are static text. But input doesn't have text content usually.
	// If first arg is string, treat as type.
	let type = "text";
	let magicArgs = args;

	if (args.length > 0 && typeof args[0] === "string") {
		type = args[0];
		magicArgs = args.slice(1);
	}

	return new InputElement(type).applyMagic(magicArgs);
};
/** Creates a `<textarea>` element. */
export const textarea = (...args: any[]) =>
	new InteractiveElement("textarea").applyMagic(args);
/** Creates a `<select>` element. */
export const select = (...args: any[]) =>
	new InteractiveElement("select").applyMagic(args);
/** Creates an `<option>` element. */
export const option = (...args: any[]) =>
	new InteractiveElement("option").applyMagic(args);
