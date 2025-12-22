import { BaseElement } from "@/elements/base-element";
import { state as createState } from "@/core/state";

export class App {
  public root: HTMLElement | null = null;
  public components: BaseElement[] = [];
  public configOptions: { title?: string } = {};
  public _state: any = null;
  public _actions: any = {};

  constructor(target?: string) {
    if (this.isBrowser && target) {
      const root: HTMLElement | null = document.querySelector(target);
      if (!root) throw new Error(`Root element ${target} not found`);
      this.root = root;
    }
  }

  public get isBrowser(): boolean {
    return typeof window !== "undefined" && typeof document !== "undefined";
  }

  public config(options: { title?: string }): this {
    this.configOptions = { ...this.configOptions, ...options };
    if (this.isBrowser && this.configOptions.title) {
      document.title = this.configOptions.title;
    }
    return this;
  }

  public setTitle(title: string): this {
    return this.config({ title });
  }

  public addStyle(style: string): this {
    if (this.isBrowser) {
      const styleEl = document.createElement('style');
      styleEl.textContent = style;
      document.head.appendChild(styleEl);
    }
    return this;
  }

  public state<T>(initialState: T): this {
    this._state = createState(initialState);
    return this;
  }

  public logic(logicFn: (state: any, actions: any) => any): this {
    // logicFn returns an object of actions
    this._actions = logicFn(this._state, this._actions);
    return this;
  }

  public add(component: BaseElement | BaseElement[]): this {
    if (Array.isArray(component)) {
      this.components.push(...component);
    } else {
      this.components.push(component);
    }
    return this;
  }

  // Alias for add, kept for backward compatibility if needed, or consistency with Element's .with()
  public with(component: BaseElement | BaseElement[]): this {
    return this.add(component);
  }

  /**
   * @description Render the app
   */
  render() {
    if (!this.isBrowser) {
      throw new Error('Rendering is only supported in the browser');
    }

    if (!this.root) {
       // If no root is specified, maybe we can append to body?
       // For now, let's assume root is required for render() if not passed in constructor.
       // But wait, the original code had 'target' in `app(target)`.
       // Let's stick to the requirement that root must be set.
       throw new Error('Root element is not set. Please provide a selector in the constructor.');
    }

    this.components.forEach(component => {
      this.root?.appendChild(component.render());
    });
    return this;
  }

  /**
   * @description Render the app to string (server-side rendering)
   */
  renderToString(): string {
    if (this.isBrowser) {
      // throw new Error('Render to string is only supported on the server');
      // Actually, rendering to string might be useful in browser too for debugging or other purposes.
      // But let's keep it simple for now.
    }

    return this.components.map(component => component.renderToString()).join("");
  }
}

const app = (target?: string) => new App(target);

export default app;
