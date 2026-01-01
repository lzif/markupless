import { BaseElement } from "./base-element";

/**
 * Represents a table-related element.
 */
export class TableElement extends BaseElement {}

/** Creates a `<table>` element. */
export const table = () => new TableElement("table");
/** Creates a `<thead>` element. */
export const thead = () => new TableElement("thead");
/** Creates a `<tbody>` element. */
export const tbody = () => new TableElement("tbody");
/** Creates a `<tr>` element. */
export const tr = () => new TableElement("tr");
/** Creates a `<th>` element. */
export const th = (text?: string) => {
	const el = new TableElement("th");
	if (text) el.text(text);
	return el;
};
/** Creates a `<td>` element. */
export const td = (text?: string) => {
	const el = new TableElement("td");
	if (text) el.text(text);
	return el;
};
