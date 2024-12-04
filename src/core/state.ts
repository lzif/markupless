let activeEffect = null;
const stateMap = new WeakMap();

function state(initialValue) {
  let value = initialValue;
  const dependents = new Set();

  const proxy = new Proxy({ value }, {
    get(target, key) {
      if (key === 'value') {
        if (activeEffect) {
          dependents.add(activeEffect);
        }
        return target[key];
      }
      return target[key];
    },
    set(target, key, newValue) {
      if (key === 'value' && target[key] !== newValue) {
        target[key] = newValue;
        dependents.forEach(effect => effect());
      }
      return true;
    }
  });

  stateMap.set(proxy, { dependents, value });
  return proxy;
}

function effect(fn) {
  const run = () => {
    activeEffect = run;
    fn();
    activeEffect = null;
  };
  run();
}

export { state, effect };
