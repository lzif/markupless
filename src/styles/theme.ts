import { StyleManager } from "./style-manager";

export type ThemeValue = string | number;
export type ThemeConfig = { [key: string]: ThemeValue | ThemeConfig };

// Helper to flatten object to paths
function flattenTheme(obj: ThemeConfig, prefix = ""): Record<string, string> {
	const result: Record<string, string> = {};

	for (const key in obj) {
		const value = obj[key];
		const newKey = prefix ? `${prefix}-${key}` : key;

		if (typeof value === "object" && value !== null) {
			Object.assign(result, flattenTheme(value, newKey));
		} else {
			result[`--${newKey}`] = String(value);
		}
	}

	return result;
}

// Helper to create a mirror object with var(...) values
function createThemeVars<T extends ThemeConfig>(obj: T, prefix = ""): T {
	const result: any = {};

	for (const key in obj) {
		const value = obj[key];
		const newKey = prefix ? `${prefix}-${key}` : key;

		if (typeof value === "object" && value !== null) {
			result[key] = createThemeVars(value as ThemeConfig, newKey);
		} else {
			result[key] = `var(--${newKey})`;
		}
	}

	return result as T;
}

/**
 * Creates a theme by defining CSS variables on the root element.
 * Returns a mirrored object containing the CSS variable references (`var(--name)`).
 *
 * @param config - The theme configuration object.
 * @returns An object with the same structure but values replaced by CSS variable references.
 * @example
 * const theme = createTheme({
 *   colors: { primary: "#007bff" }
 * });
 * // In component:
 * div().style({ color: theme.colors.primary });
 */
export function createTheme<T extends ThemeConfig>(config: T): T {
	const cssVars = flattenTheme(config);

	// Create :root style block
	const rootStyle: Record<string, string> = {};
	for (const [key, value] of Object.entries(cssVars)) {
		rootStyle[key] = value;
	}

	// Inject into :root using StyleManager
	StyleManager.getInstance().injectGlobal({ ":root": rootStyle });

	return createThemeVars(config);
}
