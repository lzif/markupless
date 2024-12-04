import App from "../src/core/app"
import { BaseElement } from "../src/elements/base-element"

let count = state(0)

const ButtonCount = new BaseElement("button")
  .style({ margin: "10px", padding: "5px", })
  .text(count)
  .on("click", (e) => {
    count += 1
  })

App("#app").with(ButtonCount).render()
