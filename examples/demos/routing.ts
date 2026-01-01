import { app, button, div, h1, p } from "../../out";

export const PageOne = () =>
	div()
		.style({ padding: "20px", background: "#f9f9f9" })
		.with(h1("Page One"))
		.with(p("This is the first page of the routing demo."))
		.with(
			button("Go to Page Two")
				.style({ padding: "10px", marginTop: "10px", cursor: "pointer" })
				.onClick(() => app().router.navigate("/routing/page2")),
		)
		.with(
			button("Back to Hub")
				.style({
					padding: "10px",
					marginTop: "10px",
					marginLeft: "10px",
					cursor: "pointer",
				})
				.onClick(() => app().router.navigate("/")),
		);

export const PageTwo = () =>
	div()
		.style({ padding: "20px", background: "#e9e9e9" })
		.with(h1("Page Two"))
		.with(p("You have navigated to the second page!"))
		.with(
			button("Go to Page One")
				.style({ padding: "10px", marginTop: "10px", cursor: "pointer" })
				.onClick(() => app().router.navigate("/routing/page1")),
		)
		.with(
			button("Back to Hub")
				.style({
					padding: "10px",
					marginTop: "10px",
					marginLeft: "10px",
					cursor: "pointer",
				})
				.onClick(() => app().router.navigate("/")),
		);
