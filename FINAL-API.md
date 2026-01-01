# Markupless Framework API Reference

This document provides a comprehensive reference for the Markupless Framework API.

## Core

### `App`

The central class for managing the application life cycle, routing, and configuration.

#### Usage
```typescript
import { app } from "markupless";

app("#app")
  .config({ title: "My App" })
  .route("/", HomeComponent)
  .render();
```

#### Methods

- **`app(target?: string): App`**
  - Accessor for the App singleton. If `target` is provided (e.g., `"#app"`), it resets/initializes the app rooted at that element.

- **`.config(options: { title?: string }): this`**
  - Configures app settings.
  - `options.title`: Sets the document title.

- **`.route(path: string, handler: RouteHandler): this`**
  - Registers a route.
  - `path`: URL path (e.g., `"/about"`).
  - `handler`: A function returning a `BaseElement` or a `BaseElement` instance.

- **`.render(): this`**
  - Renders the current route or components into the root element.
  - **Note:** Must be called after routes are defined.

- **`.use(plugin: Plugin): this`**
  - Installs a plugin.

- **`.state<T>(initialState: T): State<T>`**
  - (Legacy) Creates a reactive state. Prefer importing `state` directly.

### `state`

Creates a reactive proxy object.

```typescript
import { state } from "markupless";

const count = state(0);
console.log(count.value); // 0
count.value++;
```

- **`state<T>(value: T): State<T>`**
  - Returns a proxy where `.value` is reactive.

### `effect`

Registers a side effect that runs automatically when dependencies change.

```typescript
import { effect } from "markupless";

effect(() => {
  console.log("Count is:", count.value);
});
```

---

## Elements

All UI components extend `BaseElement`. Use factory functions to create them.

### Factory Functions

Factory functions (like `div`, `span`, `button`) accept "Magic Arguments":

- **Strings/Numbers**: Treated as text content.
- **BaseElement**: Treated as a child.
- **Array**: Treated as a list of children.
- **State**: Treated as reactive text (or value binding for inputs).
- **Function**: Treated as a derived state or lazy component.
- **Object**: Treated as attributes (except `style` and `class` which are special).

#### Examples
```typescript
div("Hello World");
div({ id: "main", class: "container" });
div(span("Child 1"), span("Child 2"));
div(myState); // Reactive text
```

### `BaseElement`

The base class for all elements.

#### Methods

- **`.with(...children): this`** (Alias: `.add`)
  - Appends children.

- **`.text(content): this`**
  - Sets text content. `content` can be a string, number, `State`, or getter function.

- **`.style(styles: object): this`**
  - Applies inline styles.
  - Example: `.style({ color: "red", marginTop: "10px" })`

- **`.css(styles: object): this`**
  - Generates a class name using the style system and applies it.

- **`.class(className: string): this`**
  - Adds a CSS class.

- **`.attr(name: string, value: string): this`**
  - Sets an HTML attribute.

- **`.on(event: string, handler: Function): this`**
  - Adds an event listener.

- **`.each(dataSource, renderer): this`**
  - Reactively renders a list.
  - `dataSource`: State array or getter.
  - `renderer`: Function `(item, index) => BaseElement`.

### Interactive Elements

#### `input`
- **`.value(val: string)`**: Sets value.
- **`.placeholder(text: string)`**: Sets placeholder.
- **Magic Binding**: `input(state)` creates a two-way binding.

#### `button`
- **`.onClick(handler)`**: Alias for `.on("click", handler)`.

---

## Router

Client-side router using History API.

- **`router.navigate(path: string)`**
  - Navigates to the specified path programmatically.

---

## Styling

### `createTheme`
Generates CSS variables from a theme configuration.

```typescript
const theme = createTheme({
  colors: { primary: "blue" }
});
```
