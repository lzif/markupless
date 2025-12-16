import { BaseElement } from "./base-element";

export class Button extends BaseElement { constructor() { super("button"); } }
export class Input extends BaseElement {
    constructor() {
        super("input");
    }

    value(val: string): this {
        this.attr("value", val);
        return this;
    }

    placeholder(val: string): this {
        this.attr("placeholder", val);
        return this;
    }

    type(val: string): this {
        this.attr("type", val);
        return this;
    }
}
export class Form extends BaseElement { constructor() { super("form"); } }
