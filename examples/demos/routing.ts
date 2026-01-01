import { app, button, div, h1, p } from "../../out";

export const PageOne = () =>
	div(
		{ style: { padding: "20px", background: "#f9f9f9" } },
		h1("Page One"),
		p("This is the first page of the routing demo."),
		button("Go to Page Two", {
			style: { padding: "10px", marginTop: "10px", cursor: "pointer" },
			onclick: () => app().router.navigate("/routing/page2"),
		}),
		button("Back to Hub", {
			style: {
				padding: "10px",
				marginTop: "10px",
				marginLeft: "10px",
				cursor: "pointer",
			},
			onclick: () => app().router.navigate("/"),
		}),
	);

export const PageTwo = () =>
	div(
		{ style: { padding: "20px", background: "#e9e9e9" } },
		h1("Page Two"),
		p("You have navigated to the second page!"),
		button("Go to Page One", {
			style: { padding: "10px", marginTop: "10px", cursor: "pointer" },
			onclick: () => app().router.navigate("/routing/page1"),
		}),
		button("Back to Hub", {
			style: {
				padding: "10px",
				marginTop: "10px",
				marginLeft: "10px",
				cursor: "pointer",
			},
			onclick: () => app().router.navigate("/"),
		}),
	);
