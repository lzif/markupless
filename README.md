# Markupless Front-End Framework

Markupless is a lightweight, minimal front-end framework that eliminates the need for traditional HTML templates or JSX. Instead, it provides a seamless way to create and manage DOM elements using pure JavaScript functions. With reactive state management built-in, building interactive UIs has never been easier.

## Key Features

- **No Markup**: No more HTML or JSX. Create UI components directly with JavaScript.
- **Reactive State Management**: Automatically update your UI when the state changes.
- **Lightweight and Fast**: Focused on performance and simplicity.
- **Functional Approach**: Embrace a functional programming style for UI creation.

## Installation

To get started with `Markupless`, simply install the package:

```bash
npm install markupless
```

## Example Usage

Here's a basic example to demonstrate a todo list built with `Markupless`. This example showcases state management and reactive UI updates without any traditional markup.

```typescript
import { el, app, state, reactive } from 'markupless';

// Define state variables
const todos = state<string[]>([]);
const todo = state<string>("");

// Function to update the todo list
const updateTodo = () => {
  const newTodo = todo.get();
  // Check if newTodo is a single word or multiple words
  if (newTodo.split(' ').length === 0 && newTodo.trim()) {
    todos.update(current => [...current, newTodo.trim()]);
  } else {
    todos.update(current => [...current, ...newTodo.split(" ")])
  }
  todo.set(''); // Reset input field
}

// Define the app structure
app({},
  el('div').class('container').child(() => [
    reactive(todos, () =>
      el('ul').class('todo-list').child(() =>
        todos.get().map((todoItem, index) =>
          el('li')
            .setText(todoItem)
            .on('click', () => {
              // Remove todo item on click
              todos.update(current =>
                current.filter((_, i) => i !== index)
              );
            })
        )
      )
    ),
    // Input field for new todo
    el('input').value(todo).on('keyup', (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        updateTodo();
      }
    }),
    // Button to add new todo
    el('button')
      .setText('Add Todo')
      .class('btn')
      .on('click', updateTodo)
  ])
);
```

## How It Works

1. **State Management**: The `state` function creates reactive state variables that automatically update the DOM when changed.
2. **Element Creation**: Use the `el` function to create HTML elements. It supports chaining methods like `class`, `setText`, and `on` for event listeners.
3. **Reactivity**: The `reactive` function listens for changes in state and automatically re-renders the necessary parts of the DOM.
4. **App Initialization**: The `app` function mounts the component structure onto the DOM.

## API

### `el(tag: string): Element`

Creates a new `Element` object with the specified HTML tag.

```typescript
const button = el('button').setText('Click me');
```

### `Element.class(className: string): Element`

Adds a class to the element.

```typescript
el('div').class('container');
```

### `Element.setText(text: string): Element`

Sets the text content of the element.

```typescript
el('p').setText('Hello World');
```

### `Element.value(state: any): Element`

Binds the value of an element to a reactive `state`.

```typescript
el('input').value(todoState);
```

### `Element.setStyle(styles: { [key: string]: string }): Element`

Sets inline CSS styles for the element.

```typescript
el('div').setStyle({ color: 'red', backgroundColor: 'blue' });
```

### `Element.on(eventName: keyof HTMLElementEventMap, handler: (event: Event) => void): Element`

Adds an event listener to the element.

```typescript
el('button').on('click', () => alert('Button clicked!'));
```

### `Element.child(childrenFn: () => (Element | string)[]): Element`

Defines children elements dynamically based on a function. Useful for reactive rendering.

```typescript
el('div').child(() => [
  el('span').setText('Child 1'),
  el('span').setText('Child 2')
]);
```

### `Element.child(...children: (Element | string)[]): Element`

Adds static child elements to the element.

```typescript
el('div').child(el('span').setText('Hello'), el('span').setText('World'));
```

### `app(props: ElementProps, root: Element): void`

Initializes the app and mounts the component tree to the DOM.

```typescript
app({}, el('div').setText('Hello App!'));
```

### `state<T>(initialValue: T):`

Creates a reactive state object.

```typescript
const count = state(0);
count.get(); // 0
count.set(5); // update state
```

- `get`: Returns the current value of the state.
- `set`: Updates the state value.
- `subscribe`: Adds a subscriber function that gets called when the state changes.
- `update`: Updates the state based on the current value.
- `bindElement`: Binds a state value to an element, typically for input binding.

### `reactive(state: any, renderFn: () => Element): Element`

Creates a reactive element that re-renders whenever the state changes.

```typescript
reactive(count, () => el('p').setText(`Count: ${count.get()}`));
```

## License

Markupless is licensed under the MIT License.
