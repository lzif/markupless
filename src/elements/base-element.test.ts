import { describe, it, expect } from 'vitest';
import { BaseElement } from './base-element';

describe('BaseElement', () => {
  it('should create an element with the correct tag name', () => {
    const element = new BaseElement('div');
    const rendered = element.renderToString();
    expect(rendered).toBe('<div></div>');
  });

  it('should set attributes correctly', () => {
    const element = new BaseElement('div');
    element.attr('id', 'test-id').class('test-class');
    const rendered = element.renderToString();
    expect(rendered).toContain('id="test-id"');
    expect(rendered).toContain('class="test-class"');
  });

  it('should set text content correctly', () => {
    const element = new BaseElement('p');
    element.text('Hello World');
    const rendered = element.renderToString();
    expect(rendered).toBe('<p>Hello World</p>');
  });

  it('should handle children correctly', () => {
    const parent = new BaseElement('div');
    const child = new BaseElement('span').text('Child');
    parent.with(child);
    const rendered = parent.renderToString();
    expect(rendered).toBe('<div><span>Child</span></div>');
  });

  it('should handle styles correctly', () => {
    const element = new BaseElement('div');
    element.style({ color: 'red', fontSize: '16px' });
    const rendered = element.renderToString();
    expect(rendered).toContain('style="color: red; font-size: 16px"');
  });
});
