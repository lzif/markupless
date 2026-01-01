import { beforeEach, describe, expect, it } from "bun:test";
import { BaseElement } from "@/elements/base-element";
import { StyleManager } from "@/styles/style-manager";
import { createTheme } from "@/styles/theme";

describe("Style System", () => {
	let styleElement: HTMLStyleElement | null;

	beforeEach(() => {
		// Reset singleton instance if possible or just clear the DOM
		document.head.innerHTML = "";
		// Since StyleManager is a singleton, we can't easily reset its internal state without a reset method.
		// However, we can check if the style tag is created and if styles are appended.
	});

	describe("StyleManager", () => {
		it("should create a style element in the head", () => {
			const manager = StyleManager.getInstance();
			manager.inject({ color: "red" });

			styleElement = document.getElementById(
				"markupless-styles",
			) as HTMLStyleElement;
			expect(styleElement).not.toBeNull();
			expect(styleElement?.tagName).toBe("STYLE");
		});

		it("should generate a unique class name and inject CSS", () => {
			const manager = StyleManager.getInstance();
			const style = { color: "blue", fontSize: "20px" };
			const className = manager.inject(style);

			expect(className).toMatch(/^mpl-/);

			styleElement = document.getElementById(
				"markupless-styles",
			) as HTMLStyleElement;
			expect(styleElement.textContent).toContain(
				`.${className} {color: blue;font-size: 20px;}`,
			);
		});

		it("should handle nested styles (pseudo-classes)", () => {
			const manager = StyleManager.getInstance();
			const style = {
				color: "green",
				"&:hover": {
					color: "red",
				},
			};
			const className = manager.inject(style);

			styleElement = document.getElementById(
				"markupless-styles",
			) as HTMLStyleElement;
			// Depending on implementation order
			expect(styleElement.textContent).toContain(
				`.${className} {color: green;}`,
			);
			expect(styleElement.textContent).toContain(
				`.${className}:hover {color: red;}`,
			);
		});

		it("should handle media queries", () => {
			const manager = StyleManager.getInstance();
			const style = {
				"@media (min-width: 500px)": {
					color: "purple",
				},
			};
			const className = manager.inject(style);

			styleElement = document.getElementById(
				"markupless-styles",
			) as HTMLStyleElement;
			expect(styleElement.textContent).toContain(
				`@media (min-width: 500px) { .${className} {color: purple;} }`,
			);
		});
	});

	describe("BaseElement Integration", () => {
		it("should add class name when .css() is called", () => {
			const element = new BaseElement("div");
			element.css({ color: "red" });

			const rendered = element.render();
			expect(rendered.className).toMatch(/^mpl-/);
		});

		it("should handle multiple classes with .class() and .css()", () => {
			const element = new BaseElement("div");
			element.class("custom-class").css({ color: "red" });

			const rendered = element.render();
			expect(rendered.className).toContain("custom-class");
			expect(rendered.className).toContain("mpl-");
		});
	});

	describe("Theme System", () => {
		it("should generate CSS variables and return variable references", () => {
			const theme = createTheme({
				colors: {
					primary: "blue",
					secondary: {
						light: "#ccc",
					},
				},
				spacing: {
					small: "8px",
				},
			});

			// Check return values
			expect(theme.colors.primary).toBe("var(--colors-primary)");
			expect((theme.colors.secondary as any).light).toBe(
				"var(--colors-secondary-light)",
			);
			expect(theme.spacing.small).toBe("var(--spacing-small)");

			// Check injection
			styleElement = document.getElementById(
				"markupless-styles",
			) as HTMLStyleElement;
			const cssContent = styleElement.textContent || "";

			expect(cssContent).toContain(":root {");
			expect(cssContent).toContain("--colors-primary: blue;");
			expect(cssContent).toContain("--colors-secondary-light: #ccc;");
			expect(cssContent).toContain("--spacing-small: 8px;");
		});
	});
});
