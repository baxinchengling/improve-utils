import { debounce } from '../../functions/debounce';
import { vi, describe, test, expect } from 'vitest';

describe('debounce function', () => {
    test('should call the function only once after the specified delay', () => {
        const mockFunction = vi.fn();
        const wait = 100;
        const debouncedFunction = debounce(mockFunction, wait);

        debouncedFunction();
        debouncedFunction();
        debouncedFunction();

        expect(mockFunction).not.toHaveBeenCalled();

        vi.runAllTimers();

        expect(mockFunction).toHaveBeenCalledTimes(1);
    });

    test('should reset the timer on each call', () => {
        const mockFunction = vi.fn();
        const wait = 100;
        const debouncedFunction = debounce(mockFunction, wait);

        debouncedFunction();
        vi.advanceTimersByTime(50);
        debouncedFunction();
        vi.advanceTimersByTime(50);
        debouncedFunction();
        vi.advanceTimersByTime(50);

        expect(mockFunction).not.toHaveBeenCalled();

        vi.runAllTimers();

        expect(mockFunction).toHaveBeenCalledTimes(1);
    });

    test('should pass the correct arguments to the function', () => {
        const mockFunction = vi.fn();
        const wait = 100;
        const debouncedFunction = debounce(mockFunction, wait);

        debouncedFunction('arg1', 'arg2');

        vi.runAllTimers();

        expect(mockFunction).toHaveBeenCalledWith('arg1', 'arg2');
    });

    test('should maintain the correct context when calling the function', () => {
        const mockFunction = vi.fn();
        const wait = 100;
        const context = { value: 42 };
        const debouncedFunction = debounce(function (this: typeof context) {
            mockFunction(this.value);
        }, wait).bind(context);

        debouncedFunction();

        vi.runAllTimers();

        expect(mockFunction).toHaveBeenCalledWith(42);
    });
});

// 设置 vitest 使用 fake timers
vi.useFakeTimers();