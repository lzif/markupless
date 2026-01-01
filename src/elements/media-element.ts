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
export const img = (src?: string, alt?: string) => new ImageElement(src, alt);
/** Creates a `<video>` element. */
export const video = (src?: string) => {
	const el = new MediaElement("video");
	if (src) el.attr("src", src);
	return el;
};
/** Creates an `<audio>` element. */
export const audio = (src?: string) => {
	const el = new MediaElement("audio");
	if (src) el.attr("src", src);
	return el;
};
