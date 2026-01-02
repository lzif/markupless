import { BaseElement } from "./base-element";
import { type State } from "@/core/state";

/**
 * Represents a container element used for layout and grouping.
 */
export class ContainerElement extends BaseElement {}

type MagicArg =
	| string
	| number
	| BaseElement
	| State<any>
	| Record<string, any>
	| (() => any)
	| MagicArg[];

type ContainerFactory = {
	(...children: BaseElement[]): ContainerElement;
	(
		attributes: Record<string, any>,
		...children: BaseElement[]
	): ContainerElement;
	(text: string): ContainerElement;
	(...args: MagicArg[]): ContainerElement;
};

const createContainer =
	(tagName: string) =>
	(...args: any[]) =>
		new ContainerElement(tagName).applyMagic(args);

/** Creates a `<div>` element. */
export const div: ContainerFactory = createContainer("div");
/** Creates a `<section>` element. */
export const section: ContainerFactory = createContainer("section");
/** Creates an `<article>` element. */
export const article: ContainerFactory = createContainer("article");
/** Creates an `<aside>` element. */
export const aside: ContainerFactory = createContainer("aside");
/** Creates a `<header>` element. */
export const header: ContainerFactory = createContainer("header");
/** Creates a `<footer>` element. */
export const footer: ContainerFactory = createContainer("footer");
/** Creates a `<main>` element. */
export const main: ContainerFactory = createContainer("main");
/** Creates a `<nav>` element. */
export const nav: ContainerFactory = createContainer("nav");
