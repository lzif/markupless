# Project TODOs

This file tracks the immediate tasks and progress for the **Markupless** framework.

## **Priority 1: Core Functionality (Phases 1-3)**
- [x] **Setup**: Initialize repository and tooling.
- [x] **`BaseElement` Implementation**: Create the base class for DOM manipulation.
- [x] **"Magic" Argument Parser**: Implement the logic to infer argument types.
- [x] **Reactivity System**: Build the `State` proxy and subscriber system.
- [x] **Basic Wrappers**: Implement `div`, `span`, `button`, `input` factories.
- [x] **List Rendering**: Implement efficient `.each()` method.

## **Priority 2: Styling & UX (Phase 4)**
- [x] **`StyleManager`**: Implement CSS-in-JS injection logic.
- [x] **Theme Config**: Create a default theme and configuration method.
- [x] **Pseudo-classes**: Support `:hover`, `:focus` in style objects.

## **Priority 3: Advanced Features (Phase 5)**
- [x] **Routing**: Implement `Router` class and `app.route()` method.
- [x] **Input Validation**: Add validators for forms (email, required, minLength).
- [x] **Plugin Architecture**: Design and implement `Plugin` interface.
- [x] **Server-Side Rendering**: Add support for rendering to strings.

## **Priority 4: Quality Assurance (Phase 6)**
- [x] **Unit Tests**: Write tests for `Router`, `StyleManager`, and `State`.
- [ ] **E2E Tests**: Basic user flows (Todo App demo).
- [ ] **Docs**: Write `CONTRIBUTING.md` and API references.
- [ ] **Optimization**: Profile memory usage of `State` proxies.

## **Priority 5: Future / Nice-to-Have**
- [ ] **Virtual Scrolling**: For large lists in `.each()`.
- [ ] **Animation Library**: Simple transition helpers (`.animate()`).
- [ ] **Hydration**: Client-side hydration for SSR content.
