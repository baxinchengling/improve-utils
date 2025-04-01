
// 简化的
// export function memoize<T extends (...args: any[]) => any>(fn: T): T {
//     const cache = new Map<string, ReturnType<T>>()
//     return function(this: unknown, ...args: Parameters<T>): ReturnType<T> {
//         const key = JSON.stringify(args)

//         if (cache.has(key)) {
//             return cache.get(key)!
//         }

//         const result = fn.apply(this, args)
//         cache.set(key, result)        
//         return result
//     } as T
// }

// ai优化后的
export function memoize<T extends (...args: any[]) => any>(fn: T): T {
    const cache = new Map<string, ReturnType<T> | Promise<ReturnType<T>>>();
    const maxCacheSize = 100; // 定义缓存的最大大小
    let cacheAccessOrder: string[] = []; // 记录访问顺序，用于 LRU 淘汰

    return function (this: unknown, ...args: Parameters<T>): ReturnType<T> {
        const key = generateCacheKey(args);

        if (cache.has(key)) {
            const cachedValue = cache.get(key);
            if (cachedValue instanceof Promise) {
                // 如果缓存的是 Promise，直接返回该 Promise
                return cachedValue as ReturnType<T>;
            }
            return cachedValue as ReturnType<T>;
        }

        const result = fn.apply(this, args);

        // 如果结果是 Promise，也需要缓存
        if (result instanceof Promise) {
            cache.set(key, result as Promise<ReturnType<T>>);
            result.then(() => {
                // 异步任务完成后保留最终结果
                cache.set(key, result);
            }).catch((error) => {
                // 异常也可以缓存，避免重复触发
                console.error(`Error in memoized function with key ${key}:`, error);
            });
        } else {
            cache.set(key, result);
        }

        // 更新访问顺序
        cacheAccessOrder.push(key);
        if (cacheAccessOrder.length > maxCacheSize) {
            const oldestKey = cacheAccessOrder.shift();
            if (oldestKey && cache.has(oldestKey)) {
                cache.delete(oldestKey);
            }
        }

        return result;
    } as T;
}

// 自定义缓存键生成函数
function generateCacheKey(args: any[]): string {
    try {
        // 使用 JSON.stringify 作为基础，但需要处理特殊情况
        return JSON.stringify(args.map(arg => serializeArg(arg)));
    } catch (error) {
        // 如果序列化失败，返回一个唯一的标识符
        console.warn("Failed to generate cache key, using fallback:", error);
        return String(args);
    }
}

// 处理特殊类型的序列化
function serializeArg(arg: any): any {
    if (typeof arg === "function") {
        return "[Function]";
    } else if (arg instanceof Date) {
        return arg.toISOString();
    } else if (arg === undefined) {
        return "[Undefined]";
    } else if (arg === null) {
        return "[Null]";
    } else if (typeof arg === "symbol") {
        return `[Symbol:${String(arg)}]`;
    }
    return arg;
}



// 使用示例
// const add = memoize((a: number, b: number): number => {
//     console.log('Calculating...');
//     return a + b;
// });

// console.log(add(1, 2)); // 计算并缓存
// console.log(add(1, 2)); // 从缓存读取



