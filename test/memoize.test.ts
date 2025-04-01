import { describe, it, expect, vi } from 'vitest';
import { memoize } from '../functions/memoize';

// describe('memoize函数测试', () => {
//     it('应该缓存函数调用结果', () => {
//         let callCount = 0;
//         const add = memoize((a: number, b: number): number => {
//             callCount++;
//             return a + b;
//         });

//         expect(add(1, 2)).toBe(3);
//         expect(add(1, 2)).toBe(3);
//         expect(callCount).toBe(1); // 验证函数只被调用一次
//     });

//     it('应该对不同参数分别缓存', () => {
//         let callCount = 0;
//         const add = memoize((a: number, b: number): number => {
//             callCount++;
//             return a + b;
//         });

//         expect(add(1, 2)).toBe(3);
//         expect(add(2, 3)).toBe(5);
//         expect(callCount).toBe(2); // 不同参数应该各调用一次
//     });

//     it('应该正确处理对象参数', () => {
//         const fn = memoize((obj: { x: number, y: number }): number => {
//             return obj.x + obj.y;
//         });

//         expect(fn({ x: 1, y: 2 })).toBe(3);
//         expect(fn({ x: 1, y: 2 })).toBe(3);
//     });

//     it('应该保持this上下文', () => {
//         const obj = {
//             multiplier: 2,
//             multiply: memoize(function(this: any, x: number): number {
//                 return x * this.multiplier;
//             })
//         };

//         expect(obj.multiply(4)).toBe(8);
//         expect(obj.multiply(4)).toBe(8);
//     });

//     it('应该处理无参数函数', () => {
//         let callCount = 0;
//         const fn = memoize(() => {
//             callCount++;
//             return 42;
//         });

//         expect(fn()).toBe(42);
//         expect(fn()).toBe(42);
//         expect(callCount).toBe(1);
//     });
// });

describe('memoize', () => {
    it('should cache synchronous function results', () => {
        const add = memoize((a: number, b: number): number => {
            console.log('Calculating...');
            return a + b;
        });

        console.log = vi.fn(); // Mock console.log to verify it's called only once

        expect(add(1, 2)).toBe(3);
        expect(console.log).toHaveBeenCalledWith('Calculating...');

        expect(add(1, 2)).toBe(3);
        expect(console.log).toHaveBeenCalledTimes(1); // Should not log again
    });

    it('should cache asynchronous function results', async () => {
        const asyncAdd = memoize(async (a: number, b: number): Promise<number> => {
            console.log('Calculating...');
            return new Promise(resolve => setTimeout(() => resolve(a + b), 100));
        });

        console.log = vi.fn(); // Mock console.log to verify it's called only once

        const result1 = await asyncAdd(1, 2);
        expect(result1).toBe(3);
        expect(console.log).toHaveBeenCalledWith('Calculating...');

        const result2 = await asyncAdd(1, 2);
        expect(result2).toBe(3);
        expect(console.log).toHaveBeenCalledTimes(1); // Should not log again
    });

    it('should handle different types of arguments', () => {
        const fn = memoize((a: any, b: any): string => {
            return `${a}-${b}`;
        });

        expect(fn(1, 2)).toBe('1-2');
        expect(fn('1', 2)).toBe('1-2');
        expect(fn(1, '2')).toBe('1-2');
        expect(fn('1', '2')).toBe('1-2');
        expect(fn(null, undefined)).toBe('null-[Undefined]');
        expect(fn(undefined, null)).toBe('[Undefined]-null');
        expect(fn(new Date(0), new Date(0))).toBe('1970-01-01T00:00:00.000Z-1970-01-01T00:00:00.000Z');
        expect(fn(() => {}, () => {})).toBe('[Function]-[Function]');
        expect(fn(Symbol('a'), Symbol('b'))).toBe('[Symbol:Symbol(a)]-[Symbol:Symbol(b)]');
    });

    it('should handle cache eviction based on LRU', () => {
        const fn = memoize((a: number): number => {
            console.log('Calculating...');
            return a;
        });

        console.log = vi.fn(); // Mock console.log to verify it's called only once

        for (let i = 0; i < 110; i++) {
            fn(i);
        }

        expect(console.log).toHaveBeenCalledTimes(110); // All calls should be logged initially

        // Accessing the first 10 items again should not trigger recalculation
        for (let i = 0; i < 10; i++) {
            fn(i);
        }

        expect(console.log).toHaveBeenCalledTimes(110); // Should not log again for the first 10 items

        // Accessing the 11th item again should not trigger recalculation
        fn(10);
        expect(console.log).toHaveBeenCalledTimes(110); // Should not log again for the 11th item

        // Accessing the 12th item again should not trigger recalculation
        fn(11);
        expect(console.log).toHaveBeenCalledTimes(110); // Should not log again for the 12th item

        // Accessing the 100th item again should not trigger recalculation
        fn(99);
        expect(console.log).toHaveBeenCalledTimes(110); // Should not log again for the 100th item

        // Accessing the 101st item again should trigger recalculation
        fn(100);
        expect(console.log).toHaveBeenCalledTimes(111); // Should log again for the 101st item
    });

    it('should handle errors and cache them', async () => {
        const errorFn = memoize(async (a: number): Promise<number> => {
            if (a === 0) {
                throw new Error('Zero is not allowed');
            }
            return a;
        });

        try {
            await errorFn(0);
        } catch (error) {
            expect(error.message).toBe('Zero is not allowed');
        }

        try {
            await errorFn(0);
        } catch (error) {
            expect(error.message).toBe('Zero is not allowed');
            // Should not log the error again
        }
    });
});

