import { BaseElement } from "./base-element";

/**
 * Base class for media elements (img, video, audio).
 */
export class MediaElement extends BaseElement {}

/**
 * Represents an `<img>` element.
 */
export class ImageElement extends MediaElement {
	constructor(src?: string, alt?: string) {
		super("img");
		if (src) this.attr("src", src);
		if (alt) this.attr("alt", alt);
	}
}

/** Creates an `<img>` element. */
export const img = (...args: any[]) => {
	// Handling backward compatibility for (src, alt)
	// We assume that if the first argument is a string, it's the src.
	// The previous check !args[0].includes(":") was incorrect for absolute URLs.
	// In the Magic API, strings are usually text content, but <img> doesn't have text content.
	// So it's safe to assume a string arg for <img> is the src.

	if (args.length > 0 && typeof args[0] === "string") {
		const src = args[0];
		const rest = args.slice(1);
		const el = new ImageElement(src);

		// If second arg is string, is it alt?
		if (rest.length > 0 && typeof rest[0] === "string") {
			el.attr("alt", rest[0]);
			el.applyMagic(rest.slice(1));
		} else {
			el.applyMagic(rest);
		}
		return el;
	}

	return new ImageElement().applyMagic(args);
};

/** Creates a `<video>` element. */
export const video = (...args: any[]) => {
	// Handle string arg as src for backward compatibility
	if (args.length > 0 && typeof args[0] === "string") {
		const src = args[0];
		const el = new MediaElement("video");
		el.attr("src", src);
		el.applyMagic(args.slice(1));
		return el;
	}
	return new MediaElement("video").applyMagic(args);
};

/** Creates an `<audio>` element. */
export const audio = (...args: any[]) => {
	// Handle string arg as src for backward compatibility
	if (args.length > 0 && typeof args[0] === "string") {
		const src = args[0];
		const el = new MediaElement("audio");
		el.attr("src", src);
		el.applyMagic(args.slice(1));
		return el;
	}
	return new MediaElement("audio").applyMagic(args);
};
