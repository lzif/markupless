import { describe, it, expect } from "vitest";
import {
	img,
	video,
	audio,
	ImageElement,
	MediaElement,
} from "../media-element";

describe("Media Elements", () => {
	it("should create image element", () => {
		const el = img("test.jpg", "alt text");
		expect(el).toBeInstanceOf(ImageElement);
		const dom = el.render() as HTMLImageElement;
		expect(dom.tagName.toLowerCase()).toBe("img");
		expect(dom.getAttribute("src")).toBe("test.jpg");
		expect(dom.getAttribute("alt")).toBe("alt text");
	});

	it("should create video element", () => {
		const el = video("test.mp4");
		expect(el).toBeInstanceOf(MediaElement);
		const dom = el.render() as HTMLVideoElement;
		expect(dom.tagName.toLowerCase()).toBe("video");
		expect(dom.getAttribute("src")).toBe("test.mp4");
	});

	it("should create audio element", () => {
		const el = audio("test.mp3");
		expect(el).toBeInstanceOf(MediaElement);
		const dom = el.render() as HTMLAudioElement;
		expect(dom.tagName.toLowerCase()).toBe("audio");
		expect(dom.getAttribute("src")).toBe("test.mp3");
	});
});
