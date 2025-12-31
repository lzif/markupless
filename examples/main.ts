import { app, div, h1, ul, li, a, section, p, button } from "../src";
import { TodoApp } from "./demos/todo";
import { FormDemo } from "./demos/forms";
import { PageOne, PageTwo } from "./demos/routing";
import { LoggerPlugin } from "./demos/plugins";

// --- Main Showcase Hub ---

const Hub = () => {
  const navigate = (path: string) => (e: MouseEvent) => {
    e.preventDefault();
    app().router.navigate(path);
  };

  return div()
    .style({
      fontFamily: "system-ui, sans-serif",
      maxWidth: "800px",
      margin: "0 auto",
      padding: "20px",
    })
    .with(
      h1("Markupless Framework Showcase").style({
        textAlign: "center",
        color: "#2c3e50",
      }),
    )
    .with(
      p("Select a demo below to see Markupless in action:").style({
        textAlign: "center",
        marginBottom: "30px",
      }),
    )
    .with(
      div()
        .style({
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px",
        })
        .with(
          DemoCard("Todo App", "Reactive state & lists", "/todo", navigate),
          DemoCard(
            "Form Validation",
            "Input validation & error handling",
            "/form",
            navigate,
          ),
          DemoCard(
            "Routing",
            "Client-side navigation",
            "/routing/page1",
            navigate,
          ),
        ),
    )
    .with(
      section()
        .style({
          marginTop: "50px",
          padding: "20px",
          background: "#f0f0f0",
          borderRadius: "8px",
        })
        .with(h1("Features Active"))
        .with(
          ul()
            .with(li("Plugin System: LoggerPlugin is active (check console)"))
            .with(li("Router: Managing this navigation"))
            .with(li("State: Managing reactive UI updates")),
        ),
    );
};

const DemoCard = (
  title: string,
  desc: string,
  path: string,
  nav: (p: string) => (e: MouseEvent) => void,
) => {
  return (
    div()
      .style({
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "20px",
        textAlign: "center",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        transition: "transform 0.2s",
        cursor: "pointer",
      })
      // Hover effect would require CSS classes or mouseover/out handlers.
      // Keeping it simple with inline styles.
      .with(h1(title).style({ fontSize: "1.2rem", margin: "0 0 10px 0" }))
      .with(p(desc).style({ color: "#666", fontSize: "0.9rem" }))
      .with(
        button("Launch")
          .style({
            marginTop: "15px",
            padding: "8px 16px",
            background: "#007BFF",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          })
          .onClick(nav(path)),
      )
  );
};

// Initialize App
const myApp = app("#app");

// Install Plugins
myApp.use(LoggerPlugin);

// Configure Routes
myApp
  .route("/", Hub)
  .route("/todo", TodoApp)
  .route("/form", FormDemo)
  .route("/routing/page1", PageOne)
  .route("/routing/page2", PageTwo);

// Render
myApp.render();
