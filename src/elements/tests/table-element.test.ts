import { describe, it, expect } from "vitest";
import {
	table,
	thead,
	tbody,
	tr,
	th,
	td,
	TableElement,
} from "../table-element";

describe("Table Elements", () => {
	it("should create table structure", () => {
		const tbl = table().add(
			thead().add(tr().add(th("Name"), th("Age"))),
			tbody().add(tr().add(td("John"), td("30"))),
		);

		expect(tbl).toBeInstanceOf(TableElement);
		const dom = tbl.render();
		expect(dom.tagName.toLowerCase()).toBe("table");
		expect(dom.querySelector("thead")).toBeTruthy();
		expect(dom.querySelector("tbody")).toBeTruthy();
		expect(dom.querySelectorAll("tr").length).toBe(2);
		expect(dom.querySelectorAll("th").length).toBe(2);
		expect(dom.querySelectorAll("td").length).toBe(2);
	});
});
