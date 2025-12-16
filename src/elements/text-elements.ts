import { BaseElement } from './base-element';

export class TextElement extends BaseElement {
  constructor(tagName: string, text?: string) {
    super(tagName);
    if (text) {
      this.text(text);
    }
  }
}

export const h1 = (text?: string) => new TextElement('h1', text);
export const h2 = (text?: string) => new TextElement('h2', text);
export const h3 = (text?: string) => new TextElement('h3', text);
export const h4 = (text?: string) => new TextElement('h4', text);
export const h5 = (text?: string) => new TextElement('h5', text);
export const h6 = (text?: string) => new TextElement('h6', text);
export const p = (text?: string) => new TextElement('p', text);
export const span = (text?: string) => new TextElement('span', text);
export const small = (text?: string) => new TextElement('small', text);
export const strong = (text?: string) => new TextElement('strong', text);
export const em = (text?: string) => new TextElement('em', text);
