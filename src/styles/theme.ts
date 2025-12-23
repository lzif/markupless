import { StyleManager } from './style-manager';

type ThemeValue = string | number;
type ThemeConfig = { [key: string]: ThemeValue | ThemeConfig };

// Helper to flatten object to paths
function flattenTheme(obj: ThemeConfig, prefix = ''): Record<string, string> {
  let result: Record<string, string> = {};

  for (const key in obj) {
    const value = obj[key];
    const newKey = prefix ? `${prefix}-${key}` : key;

    if (typeof value === 'object' && value !== null) {
      Object.assign(result, flattenTheme(value, newKey));
    } else {
      result[`--${newKey}`] = String(value);
    }
  }

  return result;
}

// Helper to create a mirror object with var(...) values
function createThemeVars<T extends ThemeConfig>(obj: T, prefix = ''): T {
  const result: any = {};

  for (const key in obj) {
    const value = obj[key];
    const newKey = prefix ? `${prefix}-${key}` : key;

    if (typeof value === 'object' && value !== null) {
      result[key] = createThemeVars(value as ThemeConfig, newKey);
    } else {
      result[key] = `var(--${newKey})`;
    }
  }

  return result as T;
}

export function createTheme<T extends ThemeConfig>(config: T): T {
  const cssVars = flattenTheme(config);

  // Create :root style block
  const rootStyle: Record<string, string> = {};
  for (const [key, value] of Object.entries(cssVars)) {
      rootStyle[key] = value;
  }

  // Inject into :root using StyleManager
  // We use a special selector ':root' which might be handled as a class by default in StyleManager
  // But wait, StyleManager generates classes.
  // We need a way to inject global styles or specific selectors.

  // Let's modify StyleManager or just use it to inject raw CSS?
  // StyleManager currently takes a style object and returns a class name.
  // It generates `.{class} { ... }`.

  // We need to extend StyleManager to support global styles.
  // Or we can just hack it:
  // StyleManager doesn't seem to support arbitrary selectors yet.

  // Let's defer the injection logic for a second and check StyleManager.

  // For now, let's assume we update StyleManager to support 'global' styles.
  StyleManager.getInstance().injectGlobal({ ':root': rootStyle });

  return createThemeVars(config);
}
