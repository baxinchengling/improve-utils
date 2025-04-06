// Chainable 类用于实现链式调用
export class Chainable<T> {
    private value: T;

    // 构造函数，初始化值
    constructor(value: T) {
        this.value = value;
    }

    // 链式调用方法，接受一个函数作为参数，并返回当前实例
    chain<U>(fn: (value: T) => U): Chainable<U> {
        this.value = fn(this.value) as unknown as T;
        return this as unknown as Chainable<U>;
    }

    // 获取最终的值
    getValue(): T {
        return this.value;
    }
}

// 示例使用
const result = new Chainable<number>(1)
    .chain((x) => x + 1) // 加1
    .chain((x) => x * 2) // 乘以2
    .getValue(); // 获取最终结果

console.log(result); // 输出: 4