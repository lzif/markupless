# **Markupless Framework** 🚀✨

![Markupless Version](https://img.shields.io/badge/Version-0.3.0-blue)
![License](https://img.shields.io/badge/License-MIT-green)
![TypeScript](https://img.shields.io/badge/Built%20With-TypeScript-blue)
![Maintainability](https://img.shields.io/badge/Maintainability-A%2B-brightgreen)

Markupless is a modern **JavaScript Framework** that offers a **markup-less** approach to building web applications. It is **readable**, **intuitive**, and designed to minimize boilerplate! 🚀  

Built for developers who want to focus on **logic and end results**, Markupless allows you to create applications that are **clean**, **magically working**, and **powerful** using a fluent, chainable API.

---

## **🔥 Key Features**

- **Fluent API**: Build your UI with chainable methods that read like natural language. 🧠
- **Reactive State Management**: Simple, proxy-based state that automatically updates the UI. 🌟
- **Component System**: Everything is a `BaseElement`, making composition easy. 🧩
- **Client-Side Routing**: Built-in router for Single Page Applications (SPA). 🗺️
- **Input Validation**: robust validation utilities for forms. ✅
- **Plugin System**: Easily extensible architecture. 🔌
- **CSS-in-JS**: Scoped styling with `StyleManager` and global theming support. 🎨
- **TypeScript First**: Written in TypeScript for excellent type safety and developer experience. 🛡️
- **Server-Side Rendering (SSR)**: Support for rendering to strings for SEO and performance. ⚡

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
    section().with(
      h1("Hello, World!").style({
        color: "#007BFF",
        textAlign: "center",
      })
    )
  )
  .render();
```

---

## **✨ Examples**

### **Interactive To-Do List**

Manage state and lists effortlessly:

```typescript
import { app, section, input, button, ul, li, state, span } from "markupless";

// Define State
const tasks = state<string[]>([]);
const newTask = state("");

// Define UI
app("#app").add(
  section().with(
    // Input Area
    div().with(
      input()
        .placeholder("New Task...")
        .onInput((val) => (newTask.value = val)),
      button("Add").onClick(() => {
        if (newTask.value) {
            tasks.value = [...tasks.value, newTask.value];
            newTask.value = "";
        }
      })
    ),
    // Reactive List
    ul().each(tasks, (task) => 
      li().with(span(task))
    )
  )
).render();
```

### **Form Validation**

Built-in validators make form handling a breeze:

```typescript
import { validate, required, email } from "markupless";

const emailState = state("");
const errorState = state("");

input().onInput(val => {
    emailState.value = val;
    const errors = validate(val, [required, email]);
    errorState.value = errors[0] || ""; // Show first error
});
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
