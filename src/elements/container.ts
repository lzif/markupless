import { BaseElement } from './base-element';

export class ContainerElement extends BaseElement {
  constructor(tagName: string) {
    super(tagName);
  }
}

export const div = () => new ContainerElement('div');
export const section = () => new ContainerElement('section');
export const article = () => new ContainerElement('article');
export const aside = () => new ContainerElement('aside');
export const header = () => new ContainerElement('header');
export const footer = () => new ContainerElement('footer');
export const main = () => new ContainerElement('main');
export const nav = () => new ContainerElement('nav');
export const ul = () => new ContainerElement('ul');
export const ol = () => new ContainerElement('ol');
export const li = () => new ContainerElement('li');
