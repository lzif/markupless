import { BaseElement } from "./base-element";

/**
 * Represents a container element used for layout and grouping.
 */
export class ContainerElement extends BaseElement {}

/** Creates a `<div>` element. */
export const div = () => new ContainerElement("div");
/** Creates a `<section>` element. */
export const section = () => new ContainerElement("section");
/** Creates an `<article>` element. */
export const article = () => new ContainerElement("article");
/** Creates an `<aside>` element. */
export const aside = () => new ContainerElement("aside");
/** Creates a `<header>` element. */
export const header = () => new ContainerElement("header");
/** Creates a `<footer>` element. */
export const footer = () => new ContainerElement("footer");
/** Creates a `<main>` element. */
export const main = () => new ContainerElement("main");
/** Creates a `<nav>` element. */
export const nav = () => new ContainerElement("nav");
