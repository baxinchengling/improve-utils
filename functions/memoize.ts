
function memoize<T extends (...args: any[]) => any>(fn: T): T {
    const cache = new Map<string, ReturnType<T>>()
    return function(this: unknown, ...args: Parameters<T>): ReturnType<T> {
        const key = JSON.stringify(args)

        if (cache.has(key)) {
            return cache.get(key)!
        }

        const result = fn.apply(this, args)
        cache.set(key, result)        
        return result
    } as T
}

// 使用示例
// const add = memoize((a: number, b: number): number => {
//     console.log('Calculating...');
//     return a + b;
// });

// console.log(add(1, 2)); // 计算并缓存
// console.log(add(1, 2)); // 从缓存读取


