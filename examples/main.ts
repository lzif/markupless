import { App, state, BaseElement } from "../out";

let count = state(0);

const ButtonCount = new BaseElement("button")
	.style({ margin: "10px", padding: "5px" })
	.text(count)
	.on("click", (e) => {
		count.value += 1;
	});

new App("#app").with(ButtonCount).render();
