/**
 * 柯里化函数
 * @param fn 需要柯里化的函数
 * @returns 柯里化后的函数
 */
export function curry<T extends (...args: any[]) => any>(fn: T) {
    const arity = fn.length;

    return function curried(...args: any[]): any {
        if (args.length >= arity) {
            return fn.apply(this, args);
        }

        return function(...moreArgs: any[]) {
            return curried.apply(this, [...args, ...moreArgs]);
        }
    };
}

// 使用示例
// function add(a: number, b: number, c: number): number {
//     return a + b + c;
// }
// const curriedAdd = curry(add);
// console.log(curriedAdd(1)(2)(3)); // 6
// console.log(curriedAdd(1, 2)(3)); // 6
// console.log(curriedAdd(1, 2, 3)); // 6

