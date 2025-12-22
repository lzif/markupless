let activeEffect: (() => void) | null = null;
const stateMap = new WeakMap();

export interface State<T> {
  value: T;
}

function state<T>(initialValue: T): State<T> {
  let value = initialValue;
  const dependents = new Set<() => void>();

  const proxy = new Proxy({ value }, {
    get(target, key) {
      if (key === 'value') {
        if (activeEffect) {
          dependents.add(activeEffect);
        }
        return target[key as keyof typeof target];
      }
      return target[key as keyof typeof target];
    },
    set(target, key, newValue) {
      if (key === 'value' && target[key as keyof typeof target] !== newValue) {
        target[key as keyof typeof target] = newValue;
        dependents.forEach(effect => effect());
      }
      return true;
    }
  });

  stateMap.set(proxy, { dependents, value });
  return proxy as State<T>;
}

function effect(fn: () => void) {
  const run = () => {
    activeEffect = run;
    fn();
    activeEffect = null;
  };
  run();
}

export { state, effect };
