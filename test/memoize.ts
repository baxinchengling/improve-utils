import { describe, it, expect } from 'vitest';
import { memoize } from '../functions/memoize';

describe('memoize函数测试', () => {
    it('应该缓存函数调用结果', () => {
        let callCount = 0;
        const add = memoize((a: number, b: number): number => {
            callCount++;
            return a + b;
        });

        expect(add(1, 2)).toBe(3);
        expect(add(1, 2)).toBe(3);
        expect(callCount).toBe(1); // 验证函数只被调用一次
    });

    it('应该对不同参数分别缓存', () => {
        let callCount = 0;
        const add = memoize((a: number, b: number): number => {
            callCount++;
            return a + b;
        });

        expect(add(1, 2)).toBe(3);
        expect(add(2, 3)).toBe(5);
        expect(callCount).toBe(2); // 不同参数应该各调用一次
    });

    it('应该正确处理对象参数', () => {
        const fn = memoize((obj: { x: number, y: number }): number => {
            return obj.x + obj.y;
        });

        expect(fn({ x: 1, y: 2 })).toBe(3);
        expect(fn({ x: 1, y: 2 })).toBe(3);
    });

    it('应该保持this上下文', () => {
        const obj = {
            multiplier: 2,
            multiply: memoize(function(this: any, x: number): number {
                return x * this.multiplier;
            })
        };

        expect(obj.multiply(4)).toBe(8);
        expect(obj.multiply(4)).toBe(8);
    });

    it('应该处理无参数函数', () => {
        let callCount = 0;
        const fn = memoize(() => {
            callCount++;
            return 42;
        });

        expect(fn()).toBe(42);
        expect(fn()).toBe(42);
        expect(callCount).toBe(1);
    });
});
