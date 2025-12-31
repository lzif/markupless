import { BaseElement } from "./base-element";

export class MediaElement extends BaseElement {
	constructor(tagName: string) {
		super(tagName);
	}
}

export class ImageElement extends MediaElement {
	constructor(src?: string, alt?: string) {
		super("img");
		if (src) this.attr("src", src);
		if (alt) this.attr("alt", alt);
	}
}

export const img = (src?: string, alt?: string) => new ImageElement(src, alt);
export const video = (src?: string) => {
	const el = new MediaElement("video");
	if (src) el.attr("src", src);
	return el;
};
export const audio = (src?: string) => {
	const el = new MediaElement("audio");
	if (src) el.attr("src", src);
	return el;
};
