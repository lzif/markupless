import { GlobalWindow } from "happy-dom";

const window = new GlobalWindow();
// @ts-ignore
global.window = window;
// @ts-ignore
global.document = window.document;
// @ts-ignore
global.HTMLElement = window.HTMLElement;
// @ts-ignore
global.Node = window.Node;
// @ts-ignore
global.Text = window.Text;
// @ts-ignore
global.Element = window.Element;
// @ts-ignore
global.HTMLImageElement = window.HTMLImageElement;
// @ts-ignore
global.HTMLVideoElement = window.HTMLVideoElement;
// @ts-ignore
global.HTMLAudioElement = window.HTMLAudioElement;
