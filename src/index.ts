type ElementProps = {
  [key: string]: any;
};

class Element {
  private element: HTMLElement | null = null;
  private tag: string;
  private props: { [key: string]: any } = {};
  private eventListeners: Map<string, EventListener> = new Map();
  private childrenFn: (() => (Element | string)[]) | null = null;
  private textContent: string | null = null;
  //private parent: HTMLElement | null = null;

  constructor(tag: string) {
    this.tag = tag;
  }

  class(className: string): Element {
    this.props.className = className;
    return this;
  }

  setText(text: string): Element {
    this.textContent = text;
    return this;
  }

  value(state: any): Element {
    if (state && typeof state === 'object' && 'subscribe' in state) {
      state.subscribe((value: string) => {
        if (this.element) {
          (this.element as HTMLInputElement).value = value;
        }
      });

      this.on('input', (e) => {
        state.set((e.target as HTMLInputElement).value);
      });
    }
    return this;
  }

  setStyle(styles: { [key: string]: string }): Element {
    this.props.style = { ...this.props.style, ...styles };
    return this;
  }

  on<K extends keyof HTMLElementEventMap>(
    eventName: K, 
    handler: (event: HTMLElementEventMap[K]) => void
  ): Element {
    const wrappedHandler = ((e: Event) => {
      handler(e as HTMLElementEventMap[K]);
    }) as EventListener;
    
    this.eventListeners.set(eventName, wrappedHandler);
    if (this.element) {
      this.element.addEventListener(eventName, wrappedHandler);
    }
    return this;
  }


  child(childrenFn: () => (Element | string)[]): Element;
  child(...children: (Element | string)[]): Element;
  child(arg: (() => (Element | string)[]) | Element | string, ...rest: (Element | string)[]): Element {
    if (typeof arg === 'function') {
      this.childrenFn = arg;
    } else {
      const staticChildren = [arg, ...rest];
      this.childrenFn = () => staticChildren;
    }
    return this;
  }

  //mount(parent: HTMLElement): void {
  //  this.parent = parent;
  //  this.render();
  //}

  private renderChildren(): void {
    if (!this.element || !this.childrenFn) return;

    this.element.innerHTML = '';

    const children = this.childrenFn();
    children.forEach(child => {
      if (typeof child === 'string') {
        this.element!.appendChild(document.createTextNode(child));
      } else {
        const childElement = child.render();
        this.element!.appendChild(childElement);
      }
    });
  }

  render(): HTMLElement {
    const isFirstRender = !this.element;
    
    if (isFirstRender) {
      this.element = document.createElement(this.tag);
      // Add event listeners only on first render
      this.eventListeners.forEach((handler, eventName) => {
        this.element!.addEventListener(eventName, handler);
      });
    }

    Object.entries(this.props).forEach(([key, value]) => {
      if (key === 'style' && typeof value === 'object') {
        Object.assign(this.element!.style, value);
      } else {
        this.element!.setAttribute(key, value);
      }
    });

    if (this.textContent !== null) {
      this.element!.textContent = this.textContent;
    }

    this.renderChildren();

    return this.element!;
  }
}

export function el(tag: string): Element {
  return new Element(tag);
}

export function app(props: ElementProps, root: Element): void {
  document.body.appendChild(root.render());
}

type Subscriber<T> = (value: T) => void;

export function state<T>(initialValue: T) {
  let value = initialValue;
  const subscribers = new Set<Subscriber<T>>();
  const elements = new Set<Element>();

  const notify = () => {
    subscribers.forEach(subscriber => subscriber(value));
    elements.forEach(element => element.render());
  };

  return {
    get: () => value,
    set: (newValue: T) => {
      value = newValue;
      notify();
    },
    subscribe: (subscriber: Subscriber<T>) => {
      subscribers.add(subscriber);
      subscriber(value);
      return () => subscribers.delete(subscriber);
    },
    update: (updater: (currentValue: T) => T) => {
      value = updater(value);
      notify();
    },
    bindElement: (element: Element) => {
      elements.add(element);
      return () => elements.delete(element);
    }
  };
}

export function reactive(state: any, renderFn: () => Element): Element {
  const element = renderFn();
  state.bindElement(element);
  return element;
}
