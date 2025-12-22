let activeEffect: (() => void) | null = null;

// Use WeakMap to associate the target object with a Map of keys to effects
const targetMap = new WeakMap<object, Map<string | symbol, Set<() => void>>>();

// Cache for reactive proxies to preserve object identity
const reactiveMap = new WeakMap<object, any>();

function track(target: object, key: string | symbol) {
  if (!activeEffect) return;

  let depsMap = targetMap.get(target);
  if (!depsMap) {
    depsMap = new Map();
    targetMap.set(target, depsMap);
  }

  let dep = depsMap.get(key);
  if (!dep) {
    dep = new Set();
    depsMap.set(key, dep);
  }

  dep.add(activeEffect);
}

function trigger(target: object, key: string | symbol) {
  const depsMap = targetMap.get(target);
  if (!depsMap) return;

  const dep = depsMap.get(key);
  if (dep) {
    dep.forEach(effect => effect());
  }
}

export function reactive<T extends object>(target: T): T {
  if (reactiveMap.has(target)) {
    return reactiveMap.get(target);
  }

  const proxy = new Proxy(target, {
    get(target, key, receiver) {
      const result = Reflect.get(target, key, receiver);
      track(target, key);
      // Recursively reactive for objects
      if (result !== null && typeof result === 'object') {
        return reactive(result);
      }
      return result;
    },
    set(target, key, value, receiver) {
      const oldValue = Reflect.get(target, key, receiver);
      const result = Reflect.set(target, key, value, receiver);
      if (oldValue !== value) {
        trigger(target, key);
      }
      return result;
    }
  });

  reactiveMap.set(target, proxy);
  return proxy;
}

export function state<T>(initialValue: T): T & { value?: T } {
  if (typeof initialValue === 'object' && initialValue !== null) {
      // If object, treat as reactive object
      return reactive(initialValue as object) as T & { value?: T };
  } else {
      // If primitive, wrap in value object like before, but use the new reactive system
      return reactive({ value: initialValue }) as unknown as T & { value?: T };
  }
}

export function effect(fn: () => void) {
  const run = () => {
    activeEffect = run;
    fn();
    activeEffect = null;
  };
  run();
}
