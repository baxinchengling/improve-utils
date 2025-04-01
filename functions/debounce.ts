/**
 * 防抖函数
 * @param func - 要防抖处理的函数
 * @param wait - 延迟时间，单位为毫秒
 * @returns 返回一个新的防抖函数
 */
export function debounce<T extends (...args: any[]) => any>(func: T, wait: number): T {
    let timeout: NodeJS.Timeout | null = null;

    return function (this: any, ...args: Parameters<T>): void {
        if (timeout !== null) {
            clearTimeout(timeout);
        }

        timeout = setTimeout(() => {
            func.apply(this, args);
        }, wait);
    } as T;
}