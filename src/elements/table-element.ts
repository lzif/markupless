import { BaseElement } from "./base-element";

export class TableElement extends BaseElement {
	constructor(tagName: string) {
		super(tagName);
	}
}

export const table = () => new TableElement("table");
export const thead = () => new TableElement("thead");
export const tbody = () => new TableElement("tbody");
export const tr = () => new TableElement("tr");
export const th = (text?: string) => {
	const el = new TableElement("th");
	if (text) el.text(text);
	return el;
};
export const td = (text?: string) => {
	const el = new TableElement("td");
	if (text) el.text(text);
	return el;
};
