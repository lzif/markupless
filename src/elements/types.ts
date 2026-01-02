// src/elements/types.ts
import type { BaseElement } from "./base-element";
import type { State } from "@/core/state";

export type MagicArg =
	| string
	| number
	| BaseElement
	| State<any>
	| Record<string, any>
	| (() => any)
	| MagicArg[];
