import { BaseElement } from "./base-element";

/**
 * Represents a table-related element.
 */
export class TableElement extends BaseElement {}

/** Creates a `<table>` element. */
export const table = (...args: any[]) =>
	new TableElement("table").applyMagic(args);
/** Creates a `<thead>` element. */
export const thead = (...args: any[]) =>
	new TableElement("thead").applyMagic(args);
/** Creates a `<tbody>` element. */
export const tbody = (...args: any[]) =>
	new TableElement("tbody").applyMagic(args);
/** Creates a `<tr>` element. */
export const tr = (...args: any[]) => new TableElement("tr").applyMagic(args);
/** Creates a `<th>` element. */
export const th = (...args: any[]) => new TableElement("th").applyMagic(args);
/** Creates a `<td>` element. */
export const td = (...args: any[]) => new TableElement("td").applyMagic(args);
