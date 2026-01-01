import { describe, it, expect, beforeEach, afterEach, spyOn } from "bun:test";
import { app } from "../core/app";
import { state } from "../core/state";
import { BaseElement } from "../elements/base-element";

// We'll mock the window/document if needed, but happy-dom is global.

describe("Integration Test: Full App Flow", () => {
    let root: HTMLElement;

    beforeEach(() => {
        // Reset URL to root
        window.history.replaceState({}, "", "/");

        // Reset DOM
        document.body.innerHTML = '<div id="app"></div>';
        root = document.getElementById("app")!;
        
        // Reset App Singleton
        app("#app"); 
    });

    afterEach(() => {
        document.body.innerHTML = "";
    });

    it("should render a component, handle state changes, and update DOM", () => {
        const count = state(0);
        
        const CounterComponent = () => {
            return new BaseElement("div")
                .attr("id", "counter-container")
                .with(
                    new BaseElement("span").attr("id", "count-display").text(count),
                    new BaseElement("button")
                        .attr("id", "inc-btn")
                        .text("Increment")
                        .on("click", () => count.value++)
                );
        };

        // Setup App
        const myApp = app();
        // Force navigation to ensure router state is clean
        myApp.router.navigate("/");
        
        myApp.route("/", CounterComponent);
        myApp.render();

        // Verify Initial Render
        const display = document.getElementById("count-display");
        const btn = document.getElementById("inc-btn");

        expect(display).not.toBeNull();
        expect(display?.textContent).toBe("0");

        // Interact
        btn?.click();

        // Verify Update
        expect(display?.textContent).toBe("1");
        expect(count.value).toBe(1);
    });

    it("should handle routing between pages", async () => {
        const PageOne = () => new BaseElement("div").text("Page One").attr("id", "page-1");
        const PageTwo = () => new BaseElement("div").text("Page Two").attr("id", "page-2");

        const myApp = app();
        
        // Force navigation to ensure router state is clean
        myApp.router.navigate("/");

        myApp.route("/", PageOne);
        myApp.route("/page2", PageTwo);
        myApp.render();

        // Check Page 1
        expect(document.getElementById("page-1")).not.toBeNull();
        expect(document.getElementById("page-2")).toBeNull();

        // Navigate
        // We can simulate navigation via router.navigate
        myApp.router.navigate("/page2");
        
        // Check Page 2
        expect(document.getElementById("page-1")).toBeNull();
        expect(document.getElementById("page-2")).not.toBeNull();
        
        // Back
        myApp.router.navigate("/");
        
        expect(document.getElementById("page-1")).not.toBeNull();
    });
});
