/**
 * 惰性函数，用于在第一次调用时执行初始化操作，并在后续调用时直接返回缓存的结果。
 * @param initializer 初始化函数，返回一个值
 * @returns 返回一个函数，该函数在第一次调用时执行初始化函数并缓存结果，后续调用直接返回缓存结果
 */
export function lazy<T>(initializer: () => T): () => T {
    let cachedValue: T | null = null;

    return () => {
        if (cachedValue === null) {
            cachedValue = initializer();
        }
        return cachedValue;
    };
}
