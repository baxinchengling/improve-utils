// declare function memoize<T>(): RereturnType<T>

function memoize<Function>(fn: Function): (...args: any[]) => any {
    const cache = new Map()
    return function (...args) {
        const key = JSON.stringify(args)
        if (cache.has(key)) {
            return cache.get(key)
        }
        if (typeof fn !== 'function') return
        const result = fn(...args)
        cache.set(key, result)        
        return result
    }
}


