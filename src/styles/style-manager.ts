import type { StyleObject } from "./types";

/**
 * Singleton class that manages CSS injection.
 * Hashes style objects to generate unique class names and avoids duplicate styles.
 */
export class StyleManager {
	private static instance: StyleManager;
	private styleElement: HTMLStyleElement | null = null;
	private styles: Map<string, string> = new Map(); // hash -> className

	private constructor() {}

	/**
	 * Returns the singleton instance of the StyleManager.
	 */
	static getInstance(): StyleManager {
		if (!StyleManager.instance) {
			StyleManager.instance = new StyleManager();
		}
		return StyleManager.instance;
	}

	private getStyleElement(): HTMLStyleElement {
		if (typeof document !== "undefined") {
			// Check if our cached element is still valid and in the DOM
			if (this.styleElement && !this.styleElement.isConnected) {
				this.styleElement = null;
			}

			if (!this.styleElement) {
				// Try to find it in the DOM (in case it was created by another instance or persisted)
				this.styleElement = document.getElementById(
					"markupless-styles",
				) as HTMLStyleElement;

				// If still not found, create it
				if (!this.styleElement) {
					this.styleElement = document.createElement("style");
					this.styleElement.id = "markupless-styles";
					document.head.appendChild(this.styleElement);
				}
			}
		}
		return this.styleElement!;
	}

	/**
	 * Injects a style object into the DOM and returns a unique class name.
	 * @param style - The style object definition.
	 * @returns The generated CSS class name.
	 * @example
	 * const className = StyleManager.getInstance().inject({ color: "red" });
	 */
	inject(style: StyleObject): string {
		const hash = this.hashStyle(style);

		if (this.styles.has(hash)) {
			return this.styles.get(hash)!;
		}

		const className = `mpl-${hash}`;
		this.styles.set(hash, className);

		const css = this.generateCSS(`.${className}`, style);

		if (typeof document !== "undefined") {
			const styleEl = this.getStyleElement();
			if (styleEl) {
				styleEl.appendChild(document.createTextNode(css));
			}
		}

		return className;
	}

	/**
	 * Injects global styles (like resets or theme variables).
	 * @param styles - A map of selectors to style objects.
	 * @example
	 * StyleManager.getInstance().injectGlobal({
	 *   "body": { margin: 0, padding: 0 }
	 * });
	 */
	injectGlobal(styles: Record<string, StyleObject>): void {
		let css = "";
		for (const selector in styles) {
			css += this.generateCSS(selector, styles[selector]);
		}

		if (typeof document !== "undefined") {
			const styleEl = this.getStyleElement();
			if (styleEl) {
				styleEl.appendChild(document.createTextNode(css));
			}
		}
	}

	private hashStyle(style: StyleObject): string {
		const str = JSON.stringify(style);
		let hash = 0;
		for (let i = 0; i < str.length; i++) {
			const char = str.charCodeAt(i);
			hash = (hash << 5) - hash + char;
			hash = hash & hash; // Convert to 32bit integer
		}
		return Math.abs(hash).toString(36);
	}

	/**
	 * Generates CSS string from a StyleObject.
	 * @param selector The CSS selector for the current block (e.g., ".mpl-123" or ".mpl-123:hover")
	 * @param style The style object
	 * @returns The generated CSS string
	 */
	private generateCSS(selector: string, style: StyleObject): string {
		let propsBlock = "";
		let nestedBlocks = "";

		for (const key in style) {
			const value = style[key];

			if (typeof value === "object") {
				// Nested block (pseudo-selector, media query, etc.)
				if (key.startsWith("@")) {
					// Media query: wrap the result of generating CSS for the *same* selector inside the media query block
					// e.g. @media (min-width: 500px) { .class { color: red; } }
					nestedBlocks += `${key} { ${this.generateCSS(selector, value)} }`;
				} else {
					// Pseudo-selector or nested selector
					// e.g. '&:hover', 'span'
					const subSelector = key.includes("&")
						? key.replace(/&/g, selector)
						: `${selector} ${key}`;

					nestedBlocks += this.generateCSS(subSelector, value);
				}
			} else {
				// CSS Property
				const kebabKey = key.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);
				propsBlock += `${kebabKey}: ${value};`;
			}
		}

		let result = "";

		// Only add the rule block if there are properties
		if (propsBlock.trim().length > 0) {
			result += `${selector} {${propsBlock}}`;
		}

		// Append nested blocks
		result += nestedBlocks;

		return result;
	}
}
