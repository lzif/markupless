export type CSSValue = string | number;

export interface StyleObject {
	[key: string]: CSSValue | StyleObject;
}
