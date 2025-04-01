import { throttle } from '../functions/throttle';
import { vi, describe, test, expect } from 'vitest';

describe('throttle function', () => {
    test('should call the function only once within the specified wait time', () => {
        const mockFunction = vi.fn();
        const wait = 100;
        const throttledFunction = throttle(mockFunction, wait);

        throttledFunction();
        throttledFunction();
        throttledFunction();

        expect(mockFunction).toHaveBeenCalledTimes(1);

        vi.advanceTimersByTime(wait);

        throttledFunction();
        expect(mockFunction).toHaveBeenCalledTimes(2);
    });

    test('should call the function again after the wait time has passed', () => {
        const mockFunction = vi.fn();
        const wait = 100;
        const throttledFunction = throttle(mockFunction, wait);

        throttledFunction();
        vi.advanceTimersByTime(wait);
        throttledFunction();

        expect(mockFunction).toHaveBeenCalledTimes(2);
    });

    test('should pass the correct arguments to the function', () => {
        const mockFunction = vi.fn();
        const wait = 100;
        const throttledFunction = throttle(mockFunction, wait);

        throttledFunction('arg1', 'arg2');

        expect(mockFunction).toHaveBeenCalledWith('arg1', 'arg2');
    });

    test('should maintain the correct context when calling the function', () => {
        const mockFunction = vi.fn();
        const wait = 100;
        const context = { value: 42 };
        const throttledFunction = throttle(function (this: typeof context) {
            mockFunction(this.value);
        }, wait).bind(context);

        throttledFunction();

        expect(mockFunction).toHaveBeenCalledWith(42);
    });
});

// 设置 vitest 使用 fake timers
vi.useFakeTimers();