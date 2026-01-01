# Markupless ✨

**The Framework that understands your intent.**

![Markupless Version](https://img.shields.io/badge/Version-0.4.0-blue)
![License](https://img.shields.io/badge/License-MIT-green)
![TypeScript](https://img.shields.io/badge/Built%20With-TypeScript-blue)
![Magically Working](https://img.shields.io/badge/Magically-Working-purple)

Markupless is a **high-abstraction** JavaScript framework designed to make raw DOM manipulation feel like magic. It combines the power of direct DOM access with intelligent argument inference.

**Why Markupless?**
Most frameworks make you work for them (hooks, compilers, v-doms). Markupless works for *you*.

## 🎩 The Magic Syntax

**1. Smart Attributes & Styling**
No need for `.style()` or `.className()`. Just pass an object.
```typescript
div({ 
  class: "card", 
  style: { color: "blue" } 
})
```

**2. Implicit Reactivity**
Don't subscribe manually. Just pass the state.

```typescript
const count = state(0);
// Framework auto-updates the text when count changes
h1("Count: ", count) 
```

**3. Auto-Wired Forms**
Two-way binding is one line of code.

```typescript
const name = state("");
// Auto-binds value and input event
input(name, { placeholder: "Your Name" }) 
```

**No Build Step. No JSX. Just Logic.**

---

## **🔥 Key Features**

- **Magically Working API**: Infers intent from arguments. 🧠
- **Reactive State Management**: Simple, proxy-based state. 🌟
- **Component System**: Everything is a `BaseElement`. 🧩
- **Client-Side Routing**: Built-in router for SPAs. 🗺️
- **Input Validation**: Robust validation utilities. ✅
- **Plugin System**: Easily extensible. 🔌
- **CSS-in-JS**: Scoped styling with `StyleManager`. 🎨
- **TypeScript First**: Excellent type safety. 🛡️
- **Server-Side Rendering (SSR)**: Support for rendering to strings. ⚡

---

## **🚀 Installation**

Install via npm:

```bash
npm install markupless
```

---

## **📖 Quick Start**

Create a **"Hello World"** application in seconds:

```typescript
import { app, section, h1 } from "markupless";

app("#app")
  .config({ title: "Hello Markupless!" })
  .add(
    section(
      h1("Hello, World!", { style: { color: "#007BFF", textAlign: "center" } })
    )
  )
  .render();
```

---

## **✨ Examples**

### **Interactive To-Do List**

Manage state and lists effortlessly:

```typescript
import { app, section, div, input, button, ul, li, state, span } from "markupless";

// Define State
const tasks = state<string[]>([]);
const newTask = state("");

// Define UI
app("#app").add(
  section(
    // Input Area
    div(
      input(newTask, { placeholder: "New Task..." }),
      button("Add").onClick(() => {
        if (newTask.value) {
            tasks.value = [...tasks.value, newTask.value];
            newTask.value = "";
        }
      })
    ),
    // Reactive List
    ul().each(tasks, (task) => 
      li(span(task))
    )
  )
).render();
```

---

## **📚 Deep Dive**

The framework is organized into core modules:

*   **`src/core`**: The brain of the operation (App, State, Router).
*   **`src/elements`**: The building blocks (div, span, input, tables, etc.).
*   **`src/styles`**: The styling engine (Theme, StyleManager).
*   **`src/utils`**: Helpers and validators.

### **Running the Demos**

This repository contains a showcase app with multiple demos (Todo, Forms, Routing).

1.  **Clone the repo**:
    ```bash
    git clone https://github.com/lzif/markupless.git
    cd markupless
    ```
2.  **Install dependencies**:
    ```bash
    npm install
    # or
    bun install
    ```
3.  **Run the dev server**:
    ```bash
    npm run dev
    # or
    bun run dev
    ```
4.  Open your browser to `http://localhost:3000` (or whatever port Bun provides).

---

## **📄 License**

Markupless is released under the **MIT License**. You are free to use it for any project! ✌️

**Happy Coding with Markupless!** 🚀
