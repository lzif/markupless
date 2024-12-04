import { BaseElement } from "@/elements/base-element";

const app = (target: string) => {
  return new class App {
    public root: HTMLElement | null
    public components: BaseElement[]

    constructor() {
      if (this.isBrowser) {
        const root: HTMLElement | null = document.querySelector(target);
        if (!root) throw new Error('Root element not found');
        this.root = root;
      } else {
        this.root = null; // Tidak diperlukan di server
      }

      this.components = [];
    }

    public get isBrowser(): boolean {
      return typeof window !== "undefined" && typeof document !== "undefined";
    }

    public with(component: BaseElement | BaseElement[]) {
      if (Array.isArray(component)) {
        this.components.push(...component);
      } else {
        this.components.push(component);
      }
      return this
    }
    /**
     * @description Render the app
     */
    render() {
      if (!this.isBrowser) {
        throw new Error('Rendering is only supported in the browser');
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
        throw new Error('Render to string is only supported on the server');
      }

      return this.components.map(component => component.renderToString()).join("");
    }
  }()
}
export default app
