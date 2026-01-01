# Markupless Framework - Agents Guidelines

Welcome to the Markupless Framework! This document provides essential information, context, and guidelines for AI agents and developers working on this codebase.

## 1. Project Overview

**Markupless** is a "Markupless Framework" designed to build web applications using pure TypeScript/JavaScript without writing HTML or JSX. It features a fluent, chainable API for DOM construction, a built-in reactive state system, a CSS-in-JS styling engine, and a client-side router.

**Core Philosophy:**
- **No Markup:** Everything is code. `div().text("Hello")` instead of `<div>Hello</div>`.
- **Fluency:** API methods return `this` to allow chaining.
- **Reactivity:** Fine-grained reactivity using signals/proxies (`state`, `effect`).
- **Isomorphic:** Supports both Client-side rendering and Server-side rendering (`renderToString`).

## 2. Technology Stack

- **Runtime & Bundler:** [Bun](https://bun.sh)
- **Language:** TypeScript (Strict Mode)
- **Testing:** `bun test` with `happy-dom` for DOM mocking.
- **Documentation:** TypeDoc (and JSDoc comments).

## 3. Directory Structure

- `src/core/`: Core framework logic (App, Router, State, Plugin).
- `src/elements/`: Element wrappers.
  - `base-element.ts`: The root class for all elements.
  - `interactive.ts`, `text-elements.ts`, etc.: Specific element implementations.
- `src/styles/`: Styling system (Theme, StyleManager).
- `src/utils/`: Utility functions (Validators, etc.).
- `examples/`: usage examples and demos.
- `tests/`: Integration/E2E tests (Unit tests are often co-located or in `tests/`).

## 4. Coding Standards

### TypeScript
- **Strict Mode:** Enabled. Do not disable strict checks.
- **No `any`:** Avoid `any`. Use generics or `unknown` with type narrowing.
- **Path Aliases:** Use `@/` to import from `src/`.
  - Example: `import { App } from "@/core/app";`

### JSDoc & Documentation
- **Mandatory JSDoc:** All exported classes, methods, and functions must have JSDoc comments.
- **Tags:** Use `@param`, `@returns`, and `@example` to explain usage.
- **Style:**
  ```typescript
  /**
   * Describes what the function does.
   * @param name - The name of the user.
   * @returns A greeting string.
   * @example
   * greet("Alice"); // Returns "Hello, Alice"
   */
  export function greet(name: string): string { ... }
  ```

### Naming Conventions
- **Classes:** PascalCase (`BaseElement`, `StyleManager`).
- **Functions/Variables:** camelCase (`createTheme`, `app`).
- **Files:** kebab-case (`base-element.ts`, `style-manager.ts`).

## 5. Architecture & Concepts

### Elements
All UI components extend `BaseElement`. They are typically instantiated via factory functions (e.g., `div()`, `span()`, `button()`) which return a new instance.
- **Chainable Methods:** `.with()`, `.text()`, `.style()`, `.css()`, `.on()`.
- **Rendering:** `.render()` (Browser) and `.renderToString()` (SSR).

### Reactive State
Located in `src/core/state.ts`.
- **`state<T>(val)`:** Creates a reactive proxy.
- **`effect(fn)`:** Automatically tracks dependencies accessed within `fn` and re-runs when they change.
- **Binding:** Elements use `effect` internally to bind text or lists to state (e.g., `.text(myState)`).

### Routing
Located in `src/core/router.ts`.
- Uses the History API.
- Intercepts clicks on internal `<a>` links.
- Supports `data-no-router` or `target="_blank"` to bypass interception.

### Styling
Located in `src/styles/`.
- **`StyleManager`:** Singleton that manages global styles.
- **`css(object)`:** Hashes the style object to generate a unique class name and injects CSS.
- **Theming:** Use `createTheme` to generate CSS variables.

## 6. Development Workflow

### Installation
```bash
npm install # (or bun install)
```

### Running Tests
```bash
bun test
```
- Tests use `happy-dom` to simulate the browser environment.
- When writing tests for DOM interactions, ensure you are creating/rendering elements and checking properties on the `domElement`.

### Building
```bash
bun run build
```
- Uses `build.ts` to bundle the library.

### Progress Tracking
- **`ROADMAP.md`:** Major features and milestones. Mark items as completed here.
- **`TODO.md`:** Smaller tasks, bugs, and technical debt.

## 7. Common Tasks for Agents

- **Adding a new Element:**
  1. Create/Update the relevant file in `src/elements/` (e.g., `media-element.ts` for `<video>`).
  2. Create a class extending `BaseElement`.
  3. Export a factory function.
  4. Add JSDoc.
  5. Add a test case.

- **Refactoring:**
  1. Ensure no regressions by running tests.
  2. Maintain the fluent API contract (return `this`).

- **Bug Fixes:**
  1. Reproduce with a failing test case if possible.
  2. Fix the issue.
  3. Verify with `bun test`.

## 8. Troubleshooting
- **"Render only available in browser":** You called `.render()` in a non-browser environment (like a basic unit test without DOM mock setup). Use `renderToString()` or ensure `happy-dom` is loaded (tests usually handle this via `setup-dom.ts` or similar).
- **Styles not applying:** Check if `StyleManager.inject()` was called and if the class name is attached to the element.
