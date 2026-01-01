let activeEffect: (() => void) | null = null;
const stateMap = new WeakMap();

export const STATE_SYMBOL = Symbol.for("markupless.state");

/**
 * Represents a reactive state wrapper.
 */
export interface State<T> {
	value: T;
	[STATE_SYMBOL]: boolean;
}

/**
 * Checks if a value is a State object.
 */
export function isState(value: any): value is State<any> {
	return value && typeof value === "object" && value[STATE_SYMBOL] === true;
}

/**
 * Creates a reactive state object.
 * When the `value` property is modified, any dependent effects will be re-run.
 *
 * @param initialValue - The initial value of the state.
 * @returns A proxy object wrapping the value.
 * @example
 * const count = state(0);
 * effect(() => console.log(count.value)); // Logs 0
 * count.value++; // Logs 1
 */
export function state<T>(initialValue: T): State<T> {
	const value = initialValue;
	const dependents = new Set<() => void>();

	const targetObject = { value };

	const proxy = new Proxy(targetObject, {
		get(target, key) {
			if (key === STATE_SYMBOL) {
				return true;
			}
			if (key === "value") {
				if (activeEffect) {
					dependents.add(activeEffect);
				}
				return target.value;
			}
			return Reflect.get(target, key);
		},
		set(target, key, newValue) {
			if (key === "value" && target.value !== newValue) {
				target.value = newValue;
				dependents.forEach((effect) => effect());
			}
			return Reflect.set(target, key, newValue);
		},
	});

	stateMap.set(proxy, { dependents, value });
	return proxy as unknown as State<T>;
}

/**
 * Registers a side effect that runs immediately and re-runs whenever
 * any state accessed within it changes.
 *
 * @param fn - The function to execute.
 * @example
 * const name = state("World");
 * effect(() => {
 *   document.body.innerText = `Hello ${name.value}`;
 * });
 */
export function effect(fn: () => void) {
	const run = () => {
		activeEffect = run;
		fn();
		activeEffect = null;
	};
	run();
}
