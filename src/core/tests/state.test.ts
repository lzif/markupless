import { describe, it, expect, vi } from 'vitest';
import { state, effect } from '../state';

describe('State Management', () => {
  it('should create a reactive state', () => {
    const count = state(0);
    expect(count.value).toBe(0);
    count.value++;
    expect(count.value).toBe(1);
  });

  it('should trigger effect when state changes', () => {
    const count = state(0);
    const callback = vi.fn();

    effect(() => {
      callback(count.value);
    });

    expect(callback).toHaveBeenCalledWith(0);
    expect(callback).toHaveBeenCalledTimes(1);

    count.value++;
    expect(callback).toHaveBeenCalledWith(1);
    expect(callback).toHaveBeenCalledTimes(2);
  });

  it('should handle multiple dependencies', () => {
    const firstName = state('John');
    const lastName = state('Doe');
    const callback = vi.fn();

    effect(() => {
      callback(`${firstName.value} ${lastName.value}`);
    });

    expect(callback).toHaveBeenCalledWith('John Doe');

    firstName.value = 'Jane';
    expect(callback).toHaveBeenCalledWith('Jane Doe');

    lastName.value = 'Smith';
    expect(callback).toHaveBeenCalledWith('Jane Smith');
  });
});
