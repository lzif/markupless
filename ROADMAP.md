# Project Roadmap

This document outlines the development roadmap for **Markupless**. The roadmap is divided into specific phases to guide the incremental build of the framework.

---

## **Phase 1: Foundation & Core Architecture**
Goal: Establish the basic structure and core classes.
- [x] **Project Setup**: Initialize TypeScript project, configure bundler (Bun/Vite), and set up test runner (Jest/Bun Test).
- [x] **Core Classes**:
  - [x] `BaseElement`: The parent class for all DOM elements.
  - [x] **State**: Basic reactive state management (signals/proxies).
- [x] **Basic Elements**: Implement wrapper functions for standard HTML tags (`div`, `span`, `h1`, `button`, etc.).
- [x] **Event Handling**: Implement `.on(event, handler)` and `.onClick(handler)` methods.

---

## **Phase 2: The "Magic" Syntax**
Goal: Implement the signature argument inference system.
- [x] **Argument Parsing**: Logic to distinguish between strings (text), objects (attributes/styles), functions (children/callbacks), and arrays (lists).
- [x] **Chaining Methods**: Implement fluid interfaces (`.style()`, `.css()`, `.add()`).
- [x] **Refactoring**: Update existing elements to use the new "Magic" parser.

---

## **Phase 3: Reactivity & State Binding**
Goal: Make the UI react to state changes automatically.
- [x] **Text Binding**: Update text nodes when passed state changes.
- [x] **Attribute Binding**: Update attributes (e.g., `class`, `disabled`) reactively.
- [x] **List Rendering**: Implement `.each(stateArray, renderer)` for efficient list updates.
- [x] **Two-Way Binding**: Helper for inputs (`input(state)`).

---

## **Phase 4: Styling & Theming**
Goal: Add a robust styling system without external CSS files.
- [x] **Style Manager**: Class to handle CSS injection and class generation.
- [x] **Theming Support**: Global theme configuration (colors, fonts, spacing).
- [x] **CSS-in-JS**: Support pseudo-classes (`:hover`) and media queries within component definitions.

---

## **Phase 5: Advanced Features**
Goal: Add features required for real-world applications.
- [x] **Router**: Simple client-side routing (`app.route('/', component)`).
- [x] **Form Handling**: Validation helpers and form state management.
- [x] **Plugin System**: Allow middleware or extensions (`app.use(plugin)`).
- [x] **SSR Support**: Basic hydration or static generation capabilities.

---

## **Phase 6: Optimization & Polish**
Goal: Prepare for 1.0 release.
- [ ] **Performance Tuning**: Minimize DOM updates and memory usage.
- [ ] **Accessibility**: Ensure default elements have proper ARIA attributes.
- [ ] **Documentation**: Comprehensive API docs and tutorials.
- [x] **Unit Tests**: Achieve >90% code coverage. (Core tests implemented)

---

## **Phase 7: Ecosystem & Tools**
Goal: Build tools to support developers.
- [ ] **CLI Tool**: Scaffolding new projects (`markupless create`).
- [ ] **DevTools Extension**: Chrome extension to inspect state and components.
- [ ] **UI Library**: Standard set of pre-styled components (Buttons, Modals, Cards).
