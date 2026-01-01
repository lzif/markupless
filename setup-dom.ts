import { GlobalWindow } from "happy-dom";

const window = new GlobalWindow();
// @ts-expect-error
global.window = window;
// @ts-expect-error
global.document = window.document;
// @ts-expect-error
global.HTMLElement = window.HTMLElement;
// @ts-expect-error
global.Node = window.Node;
// @ts-expect-error
global.Text = window.Text;
// @ts-expect-error
global.Element = window.Element;
// @ts-expect-error
global.HTMLImageElement = window.HTMLImageElement;
// @ts-expect-error
global.HTMLVideoElement = window.HTMLVideoElement;
// @ts-expect-error
global.HTMLAudioElement = window.HTMLAudioElement;
