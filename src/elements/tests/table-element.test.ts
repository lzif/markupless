import { describe, it, expect } from "bun:test";
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
		const dom = tbl.render() as unknown as HTMLElement;
		expect(dom.tagName.toLowerCase()).toBe("table");
		expect((dom as any).querySelector("thead")).toBeTruthy();
		expect((dom as any).querySelector("tbody")).toBeTruthy();
		expect((dom as any).querySelectorAll("tr").length).toBe(2);
		expect((dom as any).querySelectorAll("th").length).toBe(2);
		expect((dom as any).querySelectorAll("td").length).toBe(2);
	});
});
