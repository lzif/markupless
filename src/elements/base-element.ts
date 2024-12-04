export class BaseElement {
  private tagName: string;
  private attributes: Record<string, string>;
  private children: BaseElement[];
  private textContent: string = ""
  private eventListeners: Map<string, EventListener> = new Map();
  private readonly isInBrowser: boolean;

  constructor(tagName: string) {
    this.tagName = tagName;
    this.attributes = {};
    this.children = [];
    this.isInBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';
  }

  with(child: BaseElement | BaseElement[]): this {
    if (Array.isArray(child)) {
      child.forEach(c => this.children.push(c));
    } else {
      this.children.push(child);
    }
    return this;
  }

  text(content: string): this {
    this.textContent = content
    return this
  }

  style(styles: Partial<CSSStyleDeclaration>): this {
    this.attributes['style'] = Object.entries(styles)
      .map(([key, value]) => `${key}: ${value}`)
      .join('; ');
    return this;
  }

  class(className: string): this {
    this.attributes['class'] = className;
    return this;
  }

  attr(name: string, value: string): this {
    this.attributes[name] = value;
    return this;
  }

  on<K extends keyof HTMLElementEventMap>(
    eventName: K,
    handler: (event: HTMLElementEventMap[K]) => void
  ): this {
    const wrappedHandler = ((e: Event) => {
      handler(e as HTMLElementEventMap[K]);
    }) as EventListener;

    this.eventListeners.set(eventName, wrappedHandler);
    return this;
  }

  private readonly voidElements: Set<string> = new Set([
    'area', 'base', 'br', 'col', 'embed', 'hr', 'img',
    'input', 'link', 'meta', 'source', 'track', 'wbr'
  ]);

  private createElement(): HTMLElement | string {
    if (this.isInBrowser) {
      const element = document.createElement(this.tagName);

      Object.entries(this.attributes).forEach(([key, value]) => {
        element.setAttribute(key, value);
      });

      element.textContent = this.textContent

      for (const eventName of this.eventListeners.keys()) {
        const listeners = this.eventListeners.get(eventName);
        if (listeners) {
          element.addEventListener(eventName, listeners);
        }
      }

      if (this.children) {
        const fragment = document.createDocumentFragment();
        this.children.forEach(child => {
          const childElement = child.createElement() as HTMLElement;
          fragment.appendChild(childElement);
        });
        element.appendChild(fragment);
      }
      return element;
    } else {
      // Server-side rendering
      const attributesArray: string[] = [];
      Object.entries(this.attributes).forEach(([key, value]) => {
        attributesArray.push(`${key}="${value}"`);
      });
      const attributesString = attributesArray.join(' ');

      const startTag = `<${this.tagName}${attributesString ? ' ' + attributesString : ''}>`;

      const childrenHTML = this.children
        .map(child => child.createElement() as string)
        .join('');
      if (this.voidElements.has(this.tagName.toLowerCase())) {
        return startTag;
      }

      return `${startTag}${this.textContent}${childrenHTML}</${this.tagName}>`;
    }
  }

  render(): HTMLElement {
    if (!this.isInBrowser) {
      throw new Error('Render only available in the browser!');
    }
    return this.createElement() as HTMLElement;
  }

  renderToString(): string {
    return this.createElement() as string;
  }
}
