import { effect, type State, isState } from "@/core/state";
import { StyleManager } from "@/styles/style-manager";
import type { StyleObject } from "@/styles/types";

/**
 * Base class for all elements in the framework.
 * Provides a fluent API for building, styling, and interacting with DOM elements.
 */
export class BaseElement {
	private tagName: string;
	private attributes: Record<string, string>;
	private children: BaseElement[];
	private textContent: string = "";
	private eventListeners: Map<string, EventListener> = new Map();
	private readonly isInBrowser: boolean;
	private textEffect: (() => void) | null = null;
	private listEffect: (() => void) | null = null;
    private magicBinding: (() => void) | null = null;

	/**
	 * Creates a new BaseElement.
	 * @param tagName - The HTML tag name (e.g., "div", "span").
	 */
	constructor(tagName: string) {
		this.tagName = tagName;
		this.attributes = {};
		this.children = [];
		// Use a more robust check for browser environment or rely on global window presence
		this.isInBrowser =
			(typeof window !== "undefined" && !!window.document) ||
			// Check if we are in a test environment with DOM mocks
			(typeof globalThis !== "undefined" && // This is always true, but safe
				!!(globalThis as any).window &&
				!!(globalThis as any).document);
	}

    /**
     * Applies "Magic" argument processing.
     * Infers intent based on argument types.
     * @param args - Variadic arguments.
     * @returns The element instance.
     */
    applyMagic(args: any[]): this {
        for (const arg of args) {
            if (arg === undefined || arg === null) continue;

            if (arg instanceof BaseElement) {
                this.children.push(arg);
            } else if (Array.isArray(arg)) {
                // If it's an array, it could be a list of children
                // Or if it's reactive? The protocol says "Argument is an Array? -> Treat as List Rendering".
                // But normally we just append arrays of elements.
                // If it's a State<Array>, that's handled by isState check below? No, State<Array> is an object.
                // So this is a static array of children.
                arg.forEach(child => {
                    if (child instanceof BaseElement) {
                        this.children.push(child);
                    }
                });
            } else if (isState(arg)) {
                // Reactive Content or Binding
                if (this.tagName === "input" || this.tagName === "textarea" || this.tagName === "select") {
                     // Auto-bind value and input event
                     // We need to know if this is a value binding.
                     // The protocol says: "Pattern: input(state) -> Automatically bind value to state.value AND listen to input events"
                     
                     // We need to defer this binding until render or set it up now.
                     // We can set up the effect now.
                     
                     // Two-way binding
                     this.attr("value", String(arg.value)); // Initial value

                     // Bind State -> Input
                     this.magicBinding = () => {
                        const val = arg.value;
                         if (this.domElement && (this.domElement as any).value !== val) {
                             (this.domElement as any).value = val;
                         }
                         // Also update attribute for SSR/initial render consistency if needed, 
                         // though .value property is what matters for inputs.
                     };

                     // Bind Input -> State
                     this.on("input", (e) => {
                         const target = e.target as HTMLInputElement;
                         arg.value = target.value;
                     });

                } else {
                    // Reactive Text
                     this.text(arg as State<any>);
                }
            } else if (typeof arg === "function") {
                // Derived State or Lazy Component
                // "Argument is a Function? -> Treat as a Derived State or Lazy Component."
                try {
                    const result = arg();
                    if (result instanceof BaseElement) {
                        // It's a lazy component!
                        this.children.push(result);
                    } else {
                         // It's a reactive text getter
                         this.text(arg);
                    }
                } catch (e) {
                    // If it crashes, maybe it needs arguments?
                    // Safe bet is treating as text getter.
                    this.text(arg);
                }
            } else if (typeof arg === "object") {
                // Plain Object -> Attributes / Styles
                // "Merge multiple objects intelligently"
                if (arg.style) {
                    this.style(arg.style);
                }
                // Handle other attributes
                for (const [key, value] of Object.entries(arg)) {
                    if (key === "style") continue;
                    if (key === "class") {
                         this.class(value as string);
                    } else {
                        this.attr(key, String(value));
                    }
                }
            } else {
                // Primitive -> Static Text
                this.text(String(arg));
            }
        }
        return this;
    }

	/**
	 * Adds child elements to this element.
	 * @param children - Child elements (variadic or array).
	 * @returns The element instance for chaining.
	 * @example
	 * div().with(span("Hello"), span("World"));
	 */
	with(...children: (BaseElement | BaseElement[])[]): this {
		children.forEach((child) => {
			if (Array.isArray(child)) {
				child.forEach((c) => this.children.push(c));
			} else {
				this.children.push(child);
			}
		});
		return this;
	}

	/**
	 * Alias for `.with()`. Adds child elements.
	 * @param children - Child elements.
	 * @returns The element instance for chaining.
	 */
	add(...children: (BaseElement | BaseElement[])[]): this {
		return this.with(...children);
	}

	/**
	 * Sets the text content of the element.
	 * Supports reactive state binding.
	 * @param content - String, number, reactive State, or getter function.
	 * @returns The element instance for chaining.
	 * @example
	 * div().text("Static Text");
	 * div().text(myState); // Updates automatically
	 */
	text(
		content: string | number | State<string | number> | (() => string | number),
	): this {
		if (typeof content === "string") {
			this.textContent = content;
		} else if (typeof content === "number") {
			this.textContent = String(content);
		} else if (typeof content === "function") {
			// It's a getter function, use effect to track changes
			this.textEffect = () => {
				const val = content();
				this.textContent = String(val);
				if (this.domElement) {
					this.domElement.textContent = this.textContent;
				}
			};
		} else if (isState(content)) {
			// It's a State object
			this.textEffect = () => {
				this.textContent = String(content.value);
				if (this.domElement) {
					this.domElement.textContent = this.textContent;
				}
			};
		}
		return this;
	}

	/**
	 * Renders a list of items reactively.
	 * @param dataSource - A State array or a function returning an array.
	 * @param renderer - Function to create a BaseElement for each item.
	 * @returns The element instance for chaining.
	 * @example
	 * ul().each(tasksState, (task) => li(task));
	 */
	each<T>(
		dataSource: State<T[]> | (() => T[]),
		renderer: (item: T, index: number) => BaseElement,
	): this {
		this.listEffect = () => {
			if (!this.domElement) return;

			let data: T[];
			if (typeof dataSource === "function") {
				data = dataSource();
			} else if (isState(dataSource)) {
				data = dataSource.value;
			} else {
				data = [];
			}

			// Clear existing content.
			// Note: This replaces all content in this element.
			this.domElement.innerHTML = "";

			data.forEach((item, index) => {
				const child = renderer(item, index);
				if (this.domElement) {
					this.domElement.appendChild(child.render());
				}
			});
		};
		return this;
	}

	/**
	 * Applies inline styles to the element.
	 * @param styles - Object containing CSS properties.
	 * @returns The element instance for chaining.
	 * @example
	 * div().style({ color: "red", fontSize: "16px" });
	 */
	style(styles: Partial<CSSStyleDeclaration>): this {
        const styleString = Object.entries(styles)
			.map(([key, value]) => `${key}: ${value}`)
			.join("; ");
        
        const existingStyle = this.attributes.style ? this.attributes.style + "; " : "";
		this.attributes.style = existingStyle + styleString;
		return this;
	}

	/**
	 * Applies CSS classes using the CSS-in-JS style manager.
	 * Generates a unique class name and injects styles.
	 * @param styles - StyleObject defining the styles.
	 * @returns The element instance for chaining.
	 */
	css(styles: StyleObject): this {
		const className = StyleManager.getInstance().inject(styles);
		const existingClass = this.attributes.class || "";
		this.attributes.class = existingClass
			? `${existingClass} ${className}`
			: className;
		return this;
	}

	/**
	 * Adds a CSS class name to the element.
	 * @param className - The class name(s) to add.
	 * @returns The element instance for chaining.
	 */
	class(className: string): this {
		const existingClass = this.attributes.class || "";
		this.attributes.class = existingClass
			? `${existingClass} ${className}`
			: className;
		return this;
	}

	/**
	 * Sets an HTML attribute.
	 * @param name - The attribute name.
	 * @param value - The attribute value.
	 * @returns The element instance for chaining.
	 */
	attr(name: string, value: string): this {
		this.attributes[name] = value;
		return this;
	}

	/**
	 * Attaches an event listener to the element.
	 * @param eventName - The event name (e.g., "click").
	 * @param handler - The event handler function.
	 * @returns The element instance for chaining.
	 */
	on<K extends keyof HTMLElementEventMap>(
		eventName: K,
		handler: (event: HTMLElementEventMap[K]) => void,
	): this {
		const wrappedHandler = ((e: Event) => {
			handler(e as HTMLElementEventMap[K]);
		}) as EventListener;

		this.eventListeners.set(eventName, wrappedHandler);
		return this;
	}

	private domElement: HTMLElement | null = null;

	private readonly voidElements: Set<string> = new Set([
		"area",
		"base",
		"br",
		"col",
		"embed",
		"hr",
		"img",
		"input",
		"link",
		"meta",
		"source",
		"track",
		"wbr",
	]);

	private createElement(): HTMLElement | string {
		if (this.isInBrowser) {
			const element = document.createElement(this.tagName);
			this.domElement = element;

			Object.entries(this.attributes).forEach(([key, value]) => {
				element.setAttribute(key, value);
			});

			// Initialize text content (using effect if available)
			if (this.textEffect) {
				effect(this.textEffect);
			} else {
				element.textContent = this.textContent;
			}

            // Initialize magic binding (two-way for inputs)
            if (this.magicBinding) {
                effect(this.magicBinding);
            }

			// Initialize list content (using effect if available)
			if (this.listEffect) {
				effect(this.listEffect);
			}

			for (const eventName of this.eventListeners.keys()) {
				const listeners = this.eventListeners.get(eventName);
				if (listeners) {
					element.addEventListener(eventName, listeners);
				}
			}

			if (this.children && !this.listEffect) {
				// Only append static children if no list effect controls the content
				// Or maybe we should allow both?
				// For simplicity, if .each() is used, it takes control of children.
				const fragment = document.createDocumentFragment();
				this.children.forEach((child) => {
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
			const attributesString = attributesArray.join(" ");

			const startTag = `<${this.tagName}${attributesString ? ` ${attributesString}` : ""}>`;

			let childrenHTML = "";

			if (this.listEffect) {
				// SSR for .each is tricky because we need the data.
				// We can try to run the logic?
				// But effect() runs immediately.
				// We need to capture what the effect *would* render.
				// This is getting complex for SSR.
				// For now, let's skip SSR for .each or try to support it by running the renderer once with current state.
			} else {
				childrenHTML = this.children
					.map((child) => child.createElement() as string)
					.join("");
			}

			if (this.voidElements.has(this.tagName.toLowerCase())) {
				return startTag;
			}

			return `${startTag}${this.textContent}${childrenHTML}</${this.tagName}>`;
		}
	}

	/**
	 * Renders the element into a DOM node.
	 * @returns The created HTMLElement.
	 * @throws Error if called outside of a browser environment.
	 */
	render(): HTMLElement {
		if (!this.isInBrowser) {
			throw new Error("Render only available in the browser!");
		}
		return this.createElement() as HTMLElement;
	}

	/**
	 * Renders the element to an HTML string.
	 * @returns The HTML string.
	 */
	renderToString(): string {
		return this.createElement() as string;
	}
}
