import { BaseElement } from './base-element';

export class InteractiveElement extends BaseElement {
  constructor(tagName: string) {
    super(tagName);
  }
}

export class InputElement extends InteractiveElement {
  constructor(type: string = 'text') {
    super('input');
    this.attr('type', type);
  }

  value(val: string): this {
    this.attr('value', val);
    // If rendered, update the DOM element value property as well
    // But BaseElement mostly deals with attributes before render.
    // For now, attribute is enough.
    return this;
  }

  placeholder(text: string): this {
    this.attr('placeholder', text);
    return this;
  }

  onInput(handler: (value: string, event: Event) => void): this {
    return this.on('input', (e) => {
      const target = e.target as HTMLInputElement;
      handler(target.value, e);
    });
  }
}

export class ButtonElement extends InteractiveElement {
  constructor(text?: string) {
    super('button');
    if (text) this.text(text);
  }

  onClick(handler: (event: MouseEvent) => void): this {
    return this.on('click', handler);
  }
}

export const button = (text?: string) => new ButtonElement(text);
export const input = (type: string = 'text') => new InputElement(type);
export const textarea = () => new InteractiveElement('textarea');
export const select = () => new InteractiveElement('select');
export const option = (text?: string, value?: string) => {
    const el = new InteractiveElement('option');
    if(text) el.text(text);
    if(value) el.attr('value', value);
    return el;
};
