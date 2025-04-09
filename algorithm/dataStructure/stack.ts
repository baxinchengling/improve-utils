
/**
 * 栈-先入后出
 */
export class Stack<T> {
    private data: T[] = [];

    constructor() {
        this.data = [];
    }

    push(item: T): void {
        this.data.push(item);
    }

    pop(): T | null | undefined {
        if (this.isEmpty()) {
            return null;
        }
        return this.data.pop();
    }

    peek(): T | undefined {
        return this.data[this.data.length - 1];
    }

    isEmpty(): boolean {
        return this.data.length === 0;
    }
    size(): number {
        return this.data.length;
    }
}