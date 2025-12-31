let activeEffect: (() => void) | null = null;
const stateMap = new WeakMap();

/**
 * Represents a reactive state wrapper.
 */
export interface State<T> {
	value: T;
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
	let value = initialValue;
	const dependents = new Set<() => void>();

	const proxy = new Proxy(
		{ value },
		{
			get(target, key) {
				if (key === "value") {
					if (activeEffect) {
						dependents.add(activeEffect);
					}
					return target[key as keyof typeof target];
				}
				return target[key as keyof typeof target];
			},
			set(target, key, newValue) {
				if (
					key === "value" &&
					target[key as keyof typeof target] !== newValue
				) {
					target[key as keyof typeof target] = newValue;
					dependents.forEach((effect) => effect());
				}
				return true;
			},
		},
	);

	stateMap.set(proxy, { dependents, value });
	return proxy as State<T>;
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
