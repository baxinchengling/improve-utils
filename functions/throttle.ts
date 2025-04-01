/**
 * 创建一个节流函数，用于限制函数的执行频率。
 * 节流函数确保在指定的时间间隔内最多只执行一次给定的函数。
 * 如果在等待时间内多次调用节流函数，只有第一次调用和等待时间结束后会执行实际函数。
 * 
 * @param func 要节流的函数。
 * @param wait 等待时间，单位为毫秒，在此时间间隔内，func 最多只执行一次。
 * @returns 返回一个新的节流函数，具有与原始函数相同的类型。
 */
export function throttle<T extends (...args: any[]) => any>(func: T, wait: number): T {
    // 上次执行 func 的时间戳
    let lastCallTime = 0;
    // 定时器的 ID，用于取消定时器
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    // 返回一个新的函数，该函数具有节流功能
    return function(this: any, ...args: Parameters<T>) {
        // 当前时间戳
        const now = Date.now();
        // 自上次执行以来的时间差
        const timeSinceLastCall = now - lastCallTime;

        // 如果时间差大于等于等待时间，则执行 func
        if (timeSinceLastCall >= wait) {
            lastCallTime = now;
            func.apply(this, args);
        } else if (!timeoutId) {
            // 如果没有定时器，则设置一个新的定时器，在剩余的等待时间后执行 func
            timeoutId = setTimeout(() => {
                lastCallTime = Date.now();
                func.apply(this, args);
                timeoutId = null;
            }, wait - timeSinceLastCall);
        }
    } as T;
}