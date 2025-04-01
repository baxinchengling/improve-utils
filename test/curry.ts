import { describe, it, expect } from 'vitest';
import { curry } from '../functions/curry';

describe('curry函数测试', () => {
    it('应该正确柯里化一个三参数函数', () => {
        function add(a: number, b: number, c: number): number {
            return a + b + c;
        }
        const curriedAdd = curry(add);
        
        expect(curriedAdd(1)(2)(3)).toBe(6);
        expect(curriedAdd(1, 2)(3)).toBe(6); 
        expect(curriedAdd(1, 2, 3)).toBe(6);
    });

    it('应该保持this上下文', () => {
        const obj = {
            multiplier: 2,
            multiply(a: number, b: number): number {
                return a * b * this.multiplier;
            }
        };

        const curriedMultiply = curry(obj.multiply.bind(obj));
        expect(curriedMultiply(3)(4)).toBe(24); // 3 * 4 * 2
    });

    it('应该处理零参数函数', () => {
        function greet(): string {
            return 'Hello';
        }
        const curriedGreet = curry(greet);
        expect(curriedGreet()).toBe('Hello');
    });

    it('应该处理单参数函数', () => {
        function double(x: number): number {
            return x * 2;
        }
        const curriedDouble = curry(double);
        expect(curriedDouble(4)).toBe(8);
    });
});
